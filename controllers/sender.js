const nodemailer=require('nodemailer')
const {validationResult}=require('express-validator');

const transporter=nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

exports.postSend=(request, response, next)=>{
    const errors=validationResult(request);
    if(!errors.isEmpty()){
        const error=new Error('Some errors occured.');
        error.statusCode=422;
        error.data=errors.array();
        throw error;
    }
    const email=request.body.email;
    const message=request.body.message;
    const subject=request.body.subject;
    transporter.sendMail({
            to: email,
            from: process.env.USER,
            subject: subject,
            html: 
            `
            <p>${message}</p>
            `
    })
    .then((result)=>{
        response.status(200).json({
                message: 'Successfully sended!'
        });
    })
    .catch((error)=>{
        next(error);
    });
};