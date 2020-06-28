let DEBUG = true;
let HOST_URL = "https://py3-test-app.herokuapp.com";
let SOCKET_URL = "wss://py3-test-app.herokuapp.com";

if (DEBUG) {
  HOST_URL = "http://127.0.0.1:8000";
  SOCKET_URL = "ws://127.0.0.1:8000";
}

export { HOST_URL, SOCKET_URL };
