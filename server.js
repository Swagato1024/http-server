const { log } = require("node:console");
const net = require("node:net");

const { Response } = require("./response");
const { Handler } = require("./handler");
const { Request } = require("./request");
const { respondToPing, respondToHome, respondToEcho } = require("./routers");

const onConnection = (socket) => {
  socket.setEncoding("utf-8");

  const handler = new Handler();
  handler.addRouteHandler("/", respondToHome);
  handler.addRouteHandler("/ping", respondToPing);
  handler.addRouteHandler("/echo", respondToEcho);

  socket.on("data", (rawRequest) => {
    const request = new Request(rawRequest);
    request.parse();
    const response = new Response(socket);

    handler.handleRequest(request, response);
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
