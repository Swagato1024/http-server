class Response {
  #socket;
  #protocol;
  #code;
  #content;

  constructor(socket) {
    this.#socket = socket;
    this.#protocol = `HTTP/1.1`;
  }

  #getStatusMsg() {
    const statusMsg = {
      404: "NOT_FOUND",
      200: "OK",
      400: "BAD_REQUEST",
      405: "METHOD_NOT_ALLOWED",
    };

    return statusMsg[this.#code];
  }

  setStatus(code) {
    this.#code = code;
  }

  setContent(content) {
    this.#content = content;
  }

  #createStatusLine() {
    const statusMsg = this.#getStatusMsg();
    return `${this.#protocol} ${this.#code} ${statusMsg} `;
  }

  #createTimeStamp() {
    const date = new Date();
    return date.toGMTString();
  }

  #createHeader() {
    const date = this.#createTimeStamp();
    const dateHeader = `date: ${date}`;
    const contentLengthHeader = `Content-Length: ${this.#content.length}`;

    return `${dateHeader}\n${contentLengthHeader}`;
  }

  end() {
    const statusLine = this.#createStatusLine();
    const headers = this.#createHeader();
    const response = `${statusLine}\n${headers}\r\n\r\n${this.#content}`;

    console.log(response);

    this.#socket.write(response);
    this.#socket.end();
  }
}

module.exports = { Response };
