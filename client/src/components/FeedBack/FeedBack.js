import React from "react";
import styles from "./FeedBack.module.css";

function FeedBack() {
  return (
    <div className={styles.mainDiv}>
      <div>
      <span>Type of feedback</span>
      <select id="type">
        <option value="" disabled selected>Choose the type</option>
        <option value="a">Bugs</option>
        <option value="b">Feedback</option>
        <option value="b">Query</option>
      </select>
      </div>
      
      <div>
      <span>Feedback</span>
      <p contenteditable="true">Type your feedback</p>
      </div>
      
      <button>Submit</button>
    </div>
  );
}

export default FeedBack;
