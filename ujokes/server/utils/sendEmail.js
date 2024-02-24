const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html, res) => {
    try {
        // let testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: '	eleanora.conroy@ethereal.email',
            pass: 'QKyzdSTDWxpX5tTPXf'
          },
        });
      
        const info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>',
          to,
          subject,
          html
        });
      
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, msg: "Server error"}); 
    }
};

module.exports = sendEmail;