"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const socket_adapter_1 = require("./socket.adapter");
const port = process.env.PORT || 8080;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors({ origin: '*', allowedHeaders: '*' });
    app.useWebSocketAdapter(new socket_adapter_1.SocketAdapter(app));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map