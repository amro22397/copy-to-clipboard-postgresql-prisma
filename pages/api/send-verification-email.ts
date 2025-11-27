// import Welcome from "@/app/emails/Welcome";
import nodemailer from "nodemailer";
import { render } from '@react-email/components';
import VerifyEmailTemplate from "@/app/emails/VerifyEmailTemplate";
// import { User } from "@/models/user";
// import { connectToDatabase } from "@/lib/db";
// import mongoose from "mongoose";
// import prisma from "@/lib/prisma";
// import crypto from "crypto"
import { UserService } from "@/lib/user.service"; 
import VerifyEmailTemplateArabic from "@/app/emails/VerifyEmailTemplateArabic";
//




export default async function handler(req: any, res: any) {

  const { email, subject, locale } = req.body;

  console.log(`ASD123: `, email, subject, locale)


  if (req.method !== "POST") {

    // await connectToDatabase();

    // return res.status(405).json({ error: "Method Not Allowed" });
    res.status(200).json({
      success: false,
      // message: "Method Not Allowed"
      message: locale === "en" ? "This method is not allowed" : "هذه الطريقة غير مسموحة"

    })
    // return Response.json({
    //     success: false,
    //     message: "Method Not Allowed"
    // })
  }

  



  try {


  if (!email || !subject) {

    console.log(locale === "en" ? "Missing required fields" : "بعض المدخلات غير موجودة");

    return res.status(400).json({ 
      success: false,
      // error: "Missing required fields" 
      message: locale === "en" ? "Missing required fields" : "بعض المدخلات غير موجودة"

    });
    // return Response.json({
    //     success: false,
    //     message: "Missing required fields"
    // })
  }


  // mongoose.connect(process.env.MONGO_URL as string);
  // const user = await User.findOne({ email: email })

  // const user = await prisma.user.findUnique({
  //   where: { email: email }
  // })


  // const getVerificationToken = ():string => {
  //   const verificationToken = crypto.randomBytes(20).toString("hex");

  //   this.verifyToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  //   this.verifyTokenExpires = new Date(Date.now() + 3600000);

  //   return verificationToken;

  // }

  // const verificationToken = user.getVerificationToken();
  //   await user.save();
    // console.log(verificationToken);

    const verificationToken = await UserService.getVerificationToken(email);


    const verificationLink = `${process.env.NEXTAUTH_URL}/${locale}/verify-email?verifyToken=${verificationToken}&email=${email}`

    console.log('Verification link: ', verificationLink)




  console.log(process.env.SMTP_HOST, process.env.SMTP_PORT, process.env.SMTP_USERNAME,
     process.env.SMTP_PASSWORD, process.env.GENERATED_ZOHO_PASSWORD)

  console.log('console log: ', email, subject, locale)

  // const emailHtml = await render(VerifyEmailTemplate(verificationLink));

  const emailHtml = locale === "en" 
    ? await render(VerifyEmailTemplate(verificationLink)) 
    : await render(VerifyEmailTemplateArabic(verificationLink));

  // Mailtrap SMTP configuration
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com", // Make sure this is correct
    port: 465,
    secure: true, 
    auth: {
      user: process.env.SMTP_USERNAME, // Use environment variables for security
      pass: process.env.GENERATED_ZOHO_PASSWORD,
    },
  });


    await transporter.sendMail({
      from: 'admin@wds-oman.com',
      to: email,
      subject: subject,
      html: emailHtml,
    });

    console.log('Email sent successfully!')

    return res.status(200).json({ 
      success: true, 
      // message: "Email sent successfully!" 
      message: locale === "en" ? "Email sent successfully!" : "تم إرسال البريد الإلكتروني بنجاح!"

    });
    // return Response.json({
    //     success: true,
    //     message: "Email sent successfully!"
    // })

  } catch (error: any) {
    // console.error("Error sending email:", error);
    console.error(locale === "en" ? `Server error sending email: ${error}` : `خلل من السيرفر في إرسال البريد الإلكتروني: ${error}`);

    res.status(500).json({ 
      success: false,
      // message: "Api Error: " + error
      message: locale === "en" ? "Server Error: " + error.message : "خلل من السيرفر: " + error.message

     });
    // return Response.json({
    //     success: false,
    //     message: "Failed to send email"
    // })
  }
}
