const { log } = require("node:console");
const net = require("node:net");

const server = net.createServer();

// const content = {
//   "/": {
//     "/": "home",
//     "ping": "pong",
//   },
// };

const ERROR_404 = "Page not found";

const formatResponse = (statusCode, responseBody) => {
  const statusMsg = {
    404: "NOT_FOUND",
    200: "OK",
  };

  return `HTTP/1.1 ${statusCode} ${statusMsg[statusCode]} \n\n ${responseBody}`;
};

const parseRequestLine = (request) => {
  const [requestLine] = request.split("\n");
  const [method, uri, protocol] = requestLine.split(" ");
  return { method, uri, protocol };
};

const generateRespose = (uri) => {
  const content = {
    "/": "home",
    "/ping": "pong",
    "/echo": "echo",
  };

  const statusCode = !(uri in content) ? 404 : 200;
  const responseBody = statusCode === 404 ? ERROR_404 : content[uri];

  return formatResponse(statusCode, responseBody);
};

server.on("connection", (socket) => {
  socket.setEncoding("utf-8");

  socket.on("data", (request) => {
    const { uri } = parseRequestLine(request);
    const respose = generateRespose(uri);

    socket.write(respose);
    socket.end();
  });
});

server.listen(8000, () => {
  log(`listening on 8000`);
});
