import React, { useState } from "react";
import styles from "./FeedBack.module.css";
import { createFeedback } from "../../api/feedback";
import { toast } from "react-toastify";

function FeedBack() {
  const [type, setType] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!type || !feedbackText) {
      toast.error("Please select type and provide feedback.");
      return;
    }

    try {
      await createFeedback({ type, feedback: feedbackText });
      toast.success("Feedback submitted successfully!");
      setType("");
      setFeedbackText("");
    } catch (error) {
      toast.error("Please try again later.");
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.topdiv}>
        <span>Type of feedback</span>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="" disabled>
            Select the type
          </option>
          <option value="Bugs">Bugs</option>
          <option value="Feedback">Feedback</option>
          <option value="Query">Query</option>
        </select>
      </div>

      <div className={styles.textArea}>
        <span>Feedback</span>
        <textarea
          value={feedbackText}
          onChange={handleFeedbackChange}
          placeholder="Type your feedback"
          rows={4}
          cols={50}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FeedBack;
