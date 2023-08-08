class Handler {
  #router;

  constructor(request, response) {
    this.#router = {};
  }

  addRouteHandler(route, routeHandler) {
    this.#router[route] = routeHandler;
  }

  #respondToUriNotFound(request, response) {
    const uri = request.uri;

    response.setStatus(404);
    response.setContent(`${uri} not found`);
    response.end();
  }

  #isAcceptedProtocol(request) {
    return request.protocol.toUpperCase() === "HTTP/1.1";
  }

  #isAllowedMethod(request) {
    return request.method === "GET";
  }

  #handleBadRequest(request, response) {
    response.setStatus(400);
    response.setContent("bad request");

    response.end();
  }

  #route(request, response) {
    const uriRoot = request.uriRoot();

    if (uriRoot in this.#router) {
      const handler = this.#router[uriRoot];
      handler(request, response);
      return;
    }

    this.#respondToUriNotFound(request, response);
  }

  handleRequest(request, response) {
    if (!this.#isAcceptedProtocol(request)) {
      this.#handleBadRequest(request, response);
      return;
    }

    if (!this.#isAllowedMethod(request)) {
      this.#handleBadRequest(request, response);
      return;
    }

    this.#route(request, response);
  }
}

module.exports = { Handler };
