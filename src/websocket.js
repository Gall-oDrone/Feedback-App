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
    this.socketRef = null;
  }

  connect(chatUrl) {
    if(chatUrl != null || chatUrl != undefined){
      const path = `${SOCKET_URL}/ws/chat/${chatUrl}/`;
      this.socketRef = new WebSocket(path);
      this.socketRef.onopen = () => {
        console.log("WebSocket open");
      };
      this.socketRef.onmessage = e => {
        this.socketNewMessage(e.data);
      };
      this.socketRef.onerror = e => {
        console.log(e.message);
      };
      this.socketRef.onclose = () => {
        console.log("WebSocket closed let's reopen");
        this.connect();
      };
    } else { return}
  }

  disconnect() {
    if( this.socketRef != null){
      this.socketRef.close();
    }
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    console.log("NM, parsed", parsedData)
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
    if (command === "room_status") {
      this.callbacks[command](parsedData.status);
    }
    // if (command === "unviews") {
    //   if(this.callbacks[command]){
    //     this.callbacks[command](parsedData.unviews);
    //   }
    // }
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

  addCallbacks(messagesCallback, newMessageCallback, statusCallback) {
    this.callbacks["messages"] = messagesCallback;
    this.callbacks["new_message"] = newMessageCallback;
    this.callbacks["room_status"] = statusCallback;
    // this.callbacks["unviews"] = unviewsCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
