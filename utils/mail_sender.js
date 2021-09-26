require('dotenv').config({ path: __dirname + '/../.env' })
const nodeMailer = require('nodemailer');


// send mail with defined transport object
let send = async (to, f_name, verification_link)=>{
    const transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            // type:
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: `"Votify 👻" <${process.env.EMAIL}>`,
        to: to,
        subject: 'Votify Account Verification link ✔',
        text: `Dear, ${f_name}\nWe hope this mail finds you well.\nKindly confirm your Votify account by clicking on the link below.\n${verification_link}\nRegards,\nHossam Hamza\nVotify devloper\nGithub: https://github.com/hossamhamzahm\nemail: hossamhamza.hm@gmail.com`
    };

    await transporter.sendMail(mailOptions);
}


module.exports.send = send