import { adjectives, noun } from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import dotenv from "dotenv"
import path from "path"
import jwt from 'jsonwebtoken'
dotenv.config({ path: path.resolve(__dirname, ".env") });
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${noun[randomNumber]}`;
};

export const sendMail = (emailS) => {
 

  const client = nodemailer.createTransport({
    host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass : process.env.SECRET
      },
      service:"gmail",
      tls :{
        rejectUnautorized : false
      }
  });
  return client.sendMail(emailS)
    .then(() => {
      console.log("Message sent!");
    })
    .catch((error) => {
      console.log(error);
    });
};


export const sendSecretMail = (adress, secret) => {
  const emailS = {
    from : `fakestagram@no-reply.com <fakestagram.no.reply@gmail.com>`,
    to : adress,
    subject : "Login Secret for FakeStagram",
    html : `Hi! Your login seret is <b>${secret}</b> <br/> Copy and Paste on the app`
  }
  return sendMail(emailS)
}

export const generateToken = id => jwt.sign({id}, process.env.JWT_SECRET)