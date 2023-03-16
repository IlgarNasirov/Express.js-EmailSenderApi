const express=require('express');
const {body}=require('express-validator');

const router=express.Router();

const senderController=require('../controllers/sender');

router.post('/',[
body('email').isEmail().withMessage('Please enter a valid email.')
.normalizeEmail(),
body('message').notEmpty().withMessage('The message cannot be empty.')
], senderController.postSend);

module.exports=router;