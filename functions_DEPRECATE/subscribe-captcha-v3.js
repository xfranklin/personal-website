const fetch = require('node-fetch');

const secretKey = "6LeB3xAaAAAAAAh42_E8zN043P7bxyjM4S-oq4u4";
const api = "https://www.google.com/recaptcha/api/siteverify";

exports.handler = async (event, context) => {
  const {email, token} = JSON.parse(event.body);
  if(email && token){
    const valid = await isValidCaptcaV3(token);
    if(valid) {
      return {
        statusCode: 200,
        body: JSON.stringify(`user ${email} successfully subscribed`)
      };
    }
  }
};

async function isValidCaptcaV3(token) {
  const url = `${api}?secret=${secretKey}&response=${token}`;
  return fetch(url, { method: "POST" })
    .then(response => response.json())
    .then((data)=> data && data.success && data.score >= 0.6)
    .catch((e) => {
      console.log(e);
      return false;
    });
}