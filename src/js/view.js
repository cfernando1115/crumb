class View {
  _message = "hello!";

  log() {
    console.log(this._message);
  }
}

export default new View();