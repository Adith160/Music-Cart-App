const express = require('express')
const router = express.Router();
const feedbackController = require('../controllers/feedbackController')
const verifyUser = require('../middlewares/jwtMiddleware')

router.post('/createFeedback',verifyUser, feedbackController.createFeedback );

module.exports= router;