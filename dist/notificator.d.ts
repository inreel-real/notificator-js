declare type ChannelType = (data: any) => void;
declare type ChannelsType = {
    [key: string]: Array<ChannelType>;
};
declare type ReceiveMessageData = {
    channel: string;
    data: any;
};
declare type CallbacksType = {
    onOpened?: (event: Event) => void;
    onClosed?: (event: CloseEvent) => void;
    onError?: (event: Event) => void;
    onMessage?: (event: MessageEvent) => void;
    onMessageResult?: (result: ReceiveMessageData) => void;
};
declare class NotificatorJs {
    apiKey: string;
    webSocketProtocol: string;
    webSocketHost: string;
    socketInstance: WebSocket;
    channels: ChannelsType;
    callbacks: CallbacksType;
    constructor(apiKey: string, callbacks?: CallbacksType);
    connect(): void;
    disconnect(): void;
    subscribe(channel: string, callback?: ChannelType): void;
    unsubscribe(channel: string, callback?: ChannelType): void;
    unsubscribeAllChannels(): void;
    initInstance(): void;
    addEvents(): void;
    removeEvents(): void;
    eventConnected(event: Event): void;
    eventDisconnected(event: CloseEvent): void;
    eventError(event: Event): void;
    eventReceiveMessage(event: MessageEvent): void;
}
export default NotificatorJs;
