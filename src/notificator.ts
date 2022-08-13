type ChannelType = (data: any) => void;

type ChannelsType = {
  [key: string]: Array<ChannelType>;
};

type ReceiveMessageData = {
  channel: string;
  data: any;
};

type CallbacksType = {
  onOpened?: (event: Event) => void;
  onClosed?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onMessageResult?: (result: ReceiveMessageData) => void;
};

class NotificatorJs {
  apiKey: string = null;
  webSocketProtocol: string = process.env.PROTOCOL || 'wss';
  webSocketHost: string = process.env.HOST || 'notificator-service-l2oj2.ondigitalocean.app';
  socketInstance: WebSocket = null;
  channels: ChannelsType = {};
  callbacks: CallbacksType = {};

  constructor(apiKey: string, callbacks: CallbacksType = {}) {
    this.apiKey = apiKey;

    this.callbacks = {
      ...this.callbacks,
      ...callbacks,
    };
  }

  connect() {
    this.initInstance();
    this.addEvents();
  }

  disconnect() {
    if (this.socketInstance) {
      this.socketInstance.close();
      this.removeEvents();
      this.socketInstance = null;
      this.channels = {};
    }
  }

  subscribe(channel: string, callback: ChannelType = null) {
    if (callback) {
      if (!this.channels[channel]) {
        this.channels[channel] = [callback];
      } else {
        this.channels[channel].push(callback);
      }
    }

    this.socketInstance.send(JSON.stringify({ cmd: 'sub', name: channel }));
  }

  unsubscribe(channel: string, callback: ChannelType = null) {
    if (!this.channels[channel]) {
      return;
    }

    if (callback) {
      this.channels[channel] =
        this.channels[channel].filter((item: ChannelType) => item !== callback);
    }

    if (!callback || !this.channels[channel].length) {
      delete this.channels[channel];
      this.socketInstance.send(JSON.stringify({ cmd: 'unsub', name: channel }));
    }
  }

  unsubscribeAllChannels() {
    this.channels = {};
    this.socketInstance.send(JSON.stringify({ cmd: 'unsub' }));
  }

  initInstance() {
    this.socketInstance =
      new WebSocket(`${this.webSocketProtocol}://${this.webSocketHost}/${this.apiKey}`);
  }

  addEvents() {
    if (this.socketInstance) {
      this.socketInstance.addEventListener('open', this.eventConnected);
      this.socketInstance.addEventListener('close', this.eventDisconnected);
      this.socketInstance.addEventListener('error', this.eventError);
      this.socketInstance.addEventListener('message', this.eventReceiveMessage);
    }
  }

  removeEvents() {
    if (this.socketInstance) {
      this.socketInstance.removeEventListener('open', this.eventConnected);
      this.socketInstance.removeEventListener('close', this.eventDisconnected);
      this.socketInstance.removeEventListener('error', this.eventError);
      this.socketInstance.removeEventListener('message', this.eventReceiveMessage);
    }
  }

  eventConnected(event: Event) {
    if (this.callbacks.onOpened) {
      this.callbacks.onOpened(event);
    }
  }

  eventDisconnected(event: CloseEvent) {
    if (this.callbacks.onClosed) {
      this.callbacks.onClosed(event);
    }
  }

  eventError(event: Event) {
    if (this.callbacks.onError) {
      this.callbacks.onError(event);
    }
  }

  eventReceiveMessage(event: MessageEvent) {
    const result = <ReceiveMessageData>JSON.parse(event.data);

    if (this.callbacks.onMessage) {
      this.callbacks.onMessage(event);
    }

    if (this.callbacks.onMessageResult) {
      this.callbacks.onMessageResult(result);
    }

    this.channels[result.channel]?.forEach((callback: ChannelType) => (
      callback(result.data)
    ));
  }
}

export default NotificatorJs;
