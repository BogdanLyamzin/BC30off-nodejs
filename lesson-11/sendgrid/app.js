const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
    from: "bogdan.lyamzin.d@gmail.com",
    to: "yojihon223@sceath.com",
    subject: "Новый заказ с сайта",
    html: "<p>Новый заказ с сайта</p>"
};

sgMail.send(email)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message))