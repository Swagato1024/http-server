const { log } = require("node:console");
const net = require("node:net");

// const content = {
//   "/": {
//     "/": "home",
//     "ping": "pong",
//   },
// };

const BAD_REQUEST = "bad request";
const METHOD_NOT_AVAILABLE = "method not available";

const formatResponse = ({ statusCode, responseBody }) => {
  const statusMsg = {
    404: "NOT_FOUND",
    200: "OK",
    400: "BAD_REQUEST",
    405: "METHOD_NOT_ALLOWED",
  };

  return `HTTP/1.1 ${statusCode} ${statusMsg[statusCode]}\n\n${responseBody}`;
};

const isValidProtocol = (protocol) => {
  return protocol.toUpperCase() === "HTTP/1.1";
};

const isValidMethod = (method) => method === "GET";

const respondToUriNotFound = (uri) => {
  const respose = {
    statusCode: 200,
    responseBody: `${uri} not found`,
  };

  return formatResponse(respose);
};

const respondToInvalidProtocol = () => {
  const respose = {
    statusCode: 400,
    responseBody: BAD_REQUEST,
  };

  return formatResponse(respose);
};

const respondToInvalidMethod = () => {
  const response = {
    statusCode: 405,
    responseBody: METHOD_NOT_AVAILABLE,
  };

  return formatResponse(response);
};

const respondToValidRequest = (uri) => {
  const content = {
    "/": "home",
    "/ping": "pong",
    "/echo": "echo",
  };

  if (uri in content) {
    const response = { statusCode: 200, responseBody: content[uri] };
    return formatResponse(response);
  }

  return respondToUriNotFound(uri);
};

const generateRespose = ({ method, uri, protocol }) => {
  if (!isValidProtocol(protocol)) return respondToInvalidProtocol();

  if (!isValidMethod(method)) return respondToInvalidMethod();

  return respondToValidRequest(uri);
};

const parseRequestLine = (request) => {
  const [requestLine] = request.split("\n");
  const [method, uri, protocol] = requestLine.split(" ");
  return { method, uri, protocol: protocol.trim() };
};

const onConnection = (socket) => {
  socket.setEncoding("utf-8");

  socket.on("data", (request) => {
    const readLine = parseRequestLine(request);
    console.log("protocol", protocol);

    const respose = generateRespose(readLine);

    socket.write(respose);
    socket.end();
  });
};

const main = () => {
  const server = net.createServer();
  server.on("connection", (socket) => onConnection(socket));

  server.listen(8000, () => {
    log(`listening on 8000`);
  });
};

main();
