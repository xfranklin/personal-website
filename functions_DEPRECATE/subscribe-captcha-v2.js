const fetch = require('node-fetch');

const secretKeyCheckbox = "6Lf36h4aAAAAAGmKijrw6mYnXQDcZyVQu70cddsi";
const secretKeyInvisible = "6LdzMR4aAAAAAMWxyc069nGtMJN62QjIPv1W0gag";
const api = "https://www.google.com/recaptcha/api/siteverify";


exports.handler = async (event, context) => {
  const {email, token, isCheckbox} = JSON.parse(event.body);
  if(email && token){
    const valid = await isValidCaptcaV2(token, isCheckbox);
    if(valid) {
      return {
        statusCode: 200,
        body: JSON.stringify(`user ${email} successfully subscribed`)
      };
    }
  }
};

async function isValidCaptcaV2(token, isCheckbox) {
  const secret = isCheckbox ? secretKeyCheckbox : secretKeyInvisible;
  const url = `${api}?secret=${secret}&response=${token}`;
  return fetch(url, { method: "POST" })
    .then(response => response.json())
    .then((data)=> data && data.success)
    .catch((e) => {
      console.log(e);
      return false;
    });
}