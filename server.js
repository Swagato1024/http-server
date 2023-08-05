const { log } = require("node:console");
const net = require("node:net");

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

const respondToURINotFound = (URI) => {
  const respose = {
    statusCode: 200,
    responseBody: `${URI} not found`,
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

const hasComponents = (URI) => URI.split("/").length > 2;

const respondToURIWithComponents = (URI) => {
  const [, root, ...remainingPaths] = URI.split("/");
  return {
    statusCode: 200,
    responseBody: remainingPaths.join("/"),
  };
};

const respondToURI = (URI) => {
  const content = {
    "/": "home",
    "/ping": "pong",
    "/echo": "echo",
  };

  if (hasComponents(URI)) {
    const response = respondToURIWithComponents(URI);
    return formatResponse(response);
  }

  if (URI in content) {
    const response = { statusCode: 200, responseBody: content[URI] };
    return formatResponse(response);
  }

  return respondToURINotFound(URI);
};

const generateResponse = ({ method, URI, protocol }) => {
  if (!isValidProtocol(protocol)) return respondToInvalidProtocol();

  if (!isValidMethod(method)) return respondToInvalidMethod();

  return respondToURI(URI);
};

const parseRequestLine = (request) => {
  const [requestLine] = request.split("\n");
  const [method, URI, protocol] = requestLine.split(" ");
  return { method, URI, protocol: protocol.trim() };
};

const onConnection = (socket) => {
  socket.setEncoding("utf-8");

  socket.on("data", (request) => {
    const readLine = parseRequestLine(request);
    const respose = generateResponse(readLine);

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
