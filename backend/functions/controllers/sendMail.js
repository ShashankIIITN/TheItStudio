import Data from "../models/data.js";
import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
    try {
        const selectedRows = req.body.selectedRows;



        const selectedData = await Data.find({ id: { $in: selectedRows } });


        const emailContent = selectedData.map((user) => `
        ID: ${user.id}
        Name: ${user.name}
        Phone Number: ${user.phoneNumber}
        Email: ${user.email}
        Hobbies: ${user.hobbies}
        
        ------------------------
      `).join('');


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.PASS,
            },
        });


        const mailOptions = {
            from: "Shashank Tripathi",
            to: process.env.SENT_TO,
            subject: 'Selected User Data',
            text: emailContent,
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ success: false, message: 'Failed to send email.' });
            } else {
                console.log('Email sent:', info.response);
                res.json({ success: true, message: 'Email sent successfully.' });
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}