const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'anika.hettinger83@ethereal.email',
        pass: 'mX4f7JanZtg3u43kc7'
    }
});

const sendMail = async({email,token})=>{
 try {
       const mailOptions = {
           from: '',
           to: email,
           subject: 'Email Confirmation',
           html: `
           <p>Dear User,</p>
           <p>Thank you for signing up. Please click the link below to confirm your email:</p>
           <a href="http://yourwebsite.com/confirm?token=${token}">Confirm Email</a>
           <p>If you didn't sign up, you can ignore this email.</p>
         `,        
         };

        await transporter.sendMail(mailOptions, (error, info) => {
           if (error) {
             console.error('Error:', error);
           } else {
             console.log('Email sent:', info.response);
           }
         });
 } catch (error) {
    console.log(error)
 }
}

module.exports = {
    sendMail
}
