import express, { Express } from 'express';
import serviceSocket, { Server as SocketServer, Socket } from 'socket.io';
import http, { Server as HttpServer } from 'http';
import { ipcMain, IpcMainEvent } from 'electron';
import Events from '../constants/events';

export default class Communication {
  expressApp: Express;

  server: HttpServer;

  io: SocketServer | undefined;

  socket: Socket | undefined;

  constructor() {
    this.expressApp = express();
    this.server = http.createServer(this.expressApp);
  }

  /**
   * 创建socket服务用于和ui面进行交互
   */
  builderSockets(event: IpcMainEvent) {
    this.io = serviceSocket(this.server, {
      path: '/test',
      serveClient: false,
      // below are engine.IO options
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
    });

    this.io.on('connection', (socket) => {
      console.log('connection socket');
      this.socket = socket;
      socket.on('tomoko:player', (data) => {
        event.sender.send(Events.WebUI, data);
      });
    });

    this.server.listen(3000);
  }

  renderFunc(_: IpcMainEvent, args: unknown) {
    if (this.socket) {
      this.socket.emit('tomoko:player:send2web', args);
    }
  }

  /**
   * 创建node和 ui之间的桥梁
   */
  builderBothBridge() {
    ipcMain.once(Events.InitSocket, (event: IpcMainEvent) => {
      this.builderSockets(event);
    });
    ipcMain.removeListener(Events.Render, this.renderFunc);
    ipcMain.on(Events.Render, this.renderFunc);
  }
}
