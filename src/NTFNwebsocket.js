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
    this.socketRef2 = null;
  }

  notification_connect(chatUrl) {
    if(chatUrl != null || chatUrl != undefined){
      console.log("chatUrl is: ", chatUrl, chatUrl === null, chatUrl === undefined)
      const path = `${SOCKET_URL}/ws/notification/${chatUrl}/`;
      this.socketRef2 = new WebSocket(path);
      console.log("CULOWS: ", this.socketRef2)
      this.socketRef2.onopen = () => {
        console.log("WebSocket open");
      };
      this.socketRef2.onmessage = e => {
        this.socketNewMessage(e.data);
      };
      this.socketRef2.onerror = e => {
        console.log("NWS Error", e.message);
      };
      this.socketRef2.onclose = () => {
        console.log("WebSocket closed let's reopen");
        this.notification_connect();
      };
    } else { console.log("chatUrl is: ", chatUrl)}
  }

  disconnect() {
    if( this.socketRef2 != null){
      this.socketRef2.close();
    }
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    console.log("NM, parsed", parsedData)
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "notifications") {
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

  fetchNTFNS(username) {
    this.sendMessage({
      command: "fetch_notifications",
      username: username,
    });
  }

  updateNTFNS(username) {
    this.sendMessage({
      command: "update_notifications",
      username: username,
    });
  }

  fetchMoreNTFNS(username, offset, limit) {
    this.sendMessage({
      command: "fetch_more_notifications",
      username: username,
      offset: offset,
      limit: limit
    });
  }

  fetchNTFNViews(username) {
    this.sendMessage({
      command: "notification_views",
      username: username,
    });
  }

  receivedMessage(data){
    return data
  }

  addCallbacks(messagesCallback) {
    this.callbacks["notifications"] = messagesCallback;
  }

  addCallbacks2(unviewsCallback) {
    this.callbacks["unviews"] = unviewsCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef2.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    if(this.socketRef2 != null){
      return this.socketRef2.readyState;
    }
  }
}

const WebSocketInstance2 = WebSocketService.getInstance();

export default WebSocketInstance2;
