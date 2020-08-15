import { SOCKET_URL } from "./settings";

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef3 = null;
  }

  message_connect(chatUrl) {
    if(chatUrl != null || chatUrl != undefined){
      console.log("chatUrl is: ", chatUrl, chatUrl === null, chatUrl === undefined)
      const path = `${SOCKET_URL}/ws/messages/${chatUrl}/`;
      this.socketRef3 = new WebSocket(path);
      console.log("CULOWS: ", this.socketRef3)
      this.socketRef3.onopen = () => {
        console.log("WebSocket open");
      };
      this.socketRef3.onmessage = e => {
        this.socketNewMessage(e.data);
      };
      this.socketRef3.onerror = e => {
        console.log("NWS Error", e.message);
      };
      this.socketRef3.onclose = () => {
        console.log("WebSocket closed let's reopen");
        this.message_connect();
      };
    } else { console.log("chatUrl is: ", chatUrl)}
  }

  disconnect() {
    if( this.socketRef3 != null){
      this.socketRef3.close();
    }
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    // console.log("NM, parsed", parsedData)
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "unviews") {
      this.callbacks[command](parsedData.unviews);
      // if(this.callbacks[command]){
      //   console.log("NM, parsed 3")
      //   this.callbacks[command](parsedData.unviews);
      // }
    }
  }

  fetchMessages(username, chatId) {
    this.sendMessage({
      command: "fetch_messages",
      username: username,
      chatId: chatId
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from: message.from,
      message: message.content,
      chatId: message.chatId
    });
  }

  fetchRoomStatus(username, chatId) {
    this.sendMessage({
      command: "fetch_status",
      username: username,
      chatId: chatId
    });
  }

  newMessage(message) {
    this.sendMessage({
      command: message.command,
      from: message.from,
      message: message.content,
      chatId: message.chatId
    });
  }

  fetchMSGS(username) {
    this.sendMessage({
      command: "fetch_messages",
      username: username,
    });
  }

  updateMSGS(username) {
    this.sendMessage({
      command: "update_messages",
      username: username,
    });
  }

  fetchMoreMSGS(username, offset, limit) {
    this.sendMessage({
      command: "fetch_more_messages",
      username: username,
      offset: offset,
      limit: limit
    });
  }

  fetchMSGSViews(username) {
    this.sendMessage({
      command: "message_views",
      username: username,
    });
  }

  receivedMessage(data){
    return data
  }

  addCallbacks(messagesCallback) {
    this.callbacks["messages"] = messagesCallback;
  }

  addCallbacks2(unviewsCallback) {
    this.callbacks["unviews"] = unviewsCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef3.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    if(this.socketRef3 != null){
      return this.socketRef3.readyState;
    }
  }
}

const WebSocketInstance2 = WebSocketService.getInstance();

export default WebSocketInstance2;
