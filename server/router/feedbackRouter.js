const express = require('express')
const router = express.Router();
const feedbackController = require('../controllers/feedbackController')
const verifyUser = require('../middlewares/jwtMiddleware')

router.post('/createFeedback',verifyUser, feedbackController.createFeedback );
router.get('/getFeedbackCat',verifyUser, feedbackController.getFeedbackCat );

module.exports= router;