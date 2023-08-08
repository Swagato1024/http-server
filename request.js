class Request {
  #rawRequest;
  #request;

  constructor(rawRequest) {
    this.#rawRequest = rawRequest;
  }

  #parseHeader(headers, rawHeader) {
    const [key, value] = rawHeader.split(":");
    return { ...headers, [key]: value };
  }

  #parseRequestLine(rawRequestLine) {
    const [method, uri, protocol] = rawRequestLine.split(" ");
    return { method, uri, protocol };
  }

  parse() {
    const [rawRequestLine, ...rawHeaders] = this.#rawRequest.split("\r\n");

    const requestLineComponents = this.#parseRequestLine(rawRequestLine);
    const headers = rawHeaders.reduce(this.#parseHeader, {});

    this.#request = { headers, ...requestLineComponents };
  }

  get method() {
    return this.#request.method;
  }

  header(name) {
    return this.#request.headers[name];
  }

  isHeaderPresent(name) {
    return name in this.#request.header;
  }

  uriRoot() {
    const root = this.#request.uri.split("/").at(1);
    return `/${root}`;
  }

  get protocol() {
    return this.#request.protocol;
  }

  get uri() {
    return this.#request.uri;
  }
}

module.exports = {
  Request,
};
