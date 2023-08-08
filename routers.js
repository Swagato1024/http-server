const hasDescendences = (uri) => uri.split("/").length > 2;

const respondToPing = (request, response) => {
  response.setStatus(200);
  response.setContent("pong");

  response.end();
};

const respondToHome = (request, response) => {
  response.setStatus(200);
  response.setContent("home");
  response.end();
};

const respondToEcho = (request, response) => {
  const uri = request.uri;
  const [descendents] = uri.split("/").slice(2);
  const contentAtRoot = "echo";

  const content = hasDescendences(uri) ? descendents : contentAtRoot;

  response.setStatus(200);
  response.setContent(content);
  response.end();
};

module.exports = {
  respondToPing,
  respondToHome,
  respondToEcho,
};
