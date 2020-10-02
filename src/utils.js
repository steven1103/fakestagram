import { adjectives, noun } from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
dotenv.config({ path: path.resolve(__dirname, ".env") });
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${noun[randomNumber]}`;
};

export const sendMail = (email) => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransport(options));
  return client
    .sendMail(email)
    .then(() => {
      console.log("Message sent!");
    })
    .catch((error) => {
      console.log(error);
    });
};


export const sendSecretMail = (adress, secret) => {
  const email = {
    from : "fakestagram@no-reply.com",
    to : adress,
    subject : "Login Secret for FakeStagram",
    html : `Hi! Your login seret is <b>${secret}</b> <br/> Copy and Paste on the app`
  }
  return sendMail(email)
}