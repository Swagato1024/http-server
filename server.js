const { log } = require("node:console");
const net = require("node:net");

const server = net.createServer();

const parseRequestLine = (request) => {
  const [requestLine] = request.split("\n");
  const [method, uri, protocol] = requestLine.split(" ");
  return { method, uri, protocol };
};

const generateRespose = (uri) => {
  const content = {
    "/home": "home",
  };

  return `HTTP/1.1 200 \n\n ${content[uri]}`;
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
