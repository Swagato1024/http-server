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
const BAD_REQUEST = "bad request";

const isKnownProtocol = (protocol) => {
  return protocol.toUpperCase() === "HTTP/1.1";
};

const formatResponse = (statusCode, responseBody) => {
  const statusMsg = {
    404: "NOT_FOUND",
    200: "OK",
    400: "BAD_REQUEST",
  };

  return `HTTP/1.1 ${statusCode} ${statusMsg[statusCode]} \n\n ${responseBody}`;
};

const parseRequestLine = (request) => {
  const [requestLine] = request.split("\n");
  const [method, uri, protocol] = requestLine.split(" ");
  return { method, uri, protocol: protocol.trim() };
};

const getStatusCodeAndBody = (content, uri) => {
  if (uri in content) return { statusCode: 200, responseBody: content[uri] };

  return {
    statusCode: 404,
    responseBody: `${uri} not found`,
  };
};

const generateRespose = (protocol, uri) => {
  if (!isKnownProtocol(protocol)) {
    return formatResponse("", 400, BAD_REQUEST);
  }

  const content = {
    "/": "home",
    "/ping": "pong",
    "/echo": "echo",
  };

  const { statusCode, responseBody } = getStatusCodeAndBody(content, uri);

  return formatResponse(statusCode, responseBody);
};

server.on("connection", (socket) => {
  socket.setEncoding("utf-8");

  socket.on("data", (request) => {
    const { uri, protocol } = parseRequestLine(request);
    console.log("protocol", protocol);

    const respose = generateRespose(protocol, uri);

    socket.write(respose);
    socket.end();
  });
});

server.listen(8000, () => {
  log(`listening on 8000`);
});
