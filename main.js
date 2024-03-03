const http = require("node:http");

const server = http.createServer((req, res) => {
  console.log(req.method);
  let reqBody = "";

  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    console.log("request ", reqBody);
    res.end();
  });
});

server.listen(8080, () => {
  console.log("started listening 8080");
});
