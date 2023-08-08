
const isMethodAllowed = (request) => {
  const { method } = request;
  return method === "GET";
};

const handleNotFoundURI = (request, response) => {
  const { URI } = request;
  response.setStatus(404);
  response.setContent(`${URI} not found`);
  response.end();
};

const respondToEcho = () => {};



const handleURI = (request, response) => {
  const { URI } = request;

  const handlers = {
    "/ping": respondToPing,
    "/echo": respondToEcho,
  };

  if (URI in handlers) {
    const handler = handlers[URI];
    handler(request, response);
    return;
  }

  handleNotFoundURI(request, response);
};

