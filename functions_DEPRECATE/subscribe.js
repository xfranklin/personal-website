exports.handler = async (event, context) => {
  const email = event.body || null;
  if(email) {
    return {
      statusCode: 200,
      body: JSON.stringify(`user ${email} successfully subscribed`)
    };
  }
};
