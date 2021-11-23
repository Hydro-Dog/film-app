"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGetaway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const match_session_model_1 = require("../match-session/match-session.model");
let AppGetaway = class AppGetaway {
    constructor(logger) {
        this.logger = logger;
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client ${client.id} connected`, 'AppGetaway');
    }
    handleDisconnect(client) {
        this.logger.log(`Client ${client.id} disconnected`, 'AppGetaway');
    }
    registerSocketListener(content, socket) {
        socket.join(content.id.toString());
        return {
            event: match_session_model_1.MatchSessionSocketEvents.RegisterNewListener,
            data: `Listener with id ${content.id} registered`,
        };
    }
    emitToClient(id, event, message) {
        this.wss.to(id.toString()).emit(event, { message });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], AppGetaway.prototype, "wss", void 0);
__decorate([
    websockets_1.SubscribeMessage(match_session_model_1.MatchSessionSocketEvents.RegisterNewListener),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Object)
], AppGetaway.prototype, "registerSocketListener", null);
AppGetaway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [common_1.Logger])
], AppGetaway);
exports.AppGetaway = AppGetaway;
//# sourceMappingURL=app-getaway.js.map