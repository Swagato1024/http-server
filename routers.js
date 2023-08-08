const respondToPing = (request, response) => {
  response.setStatus(200);
  response.setContent("pong");

  response.end();
};

const respondToHome = (request, response) => {};

module.exports = {
  respondToPing,
  respondToHome,
};
