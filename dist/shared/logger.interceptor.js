"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
class LoggerInterceptor {
    intercept(context, next) {
        const now = Date.now();
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        context.getHandler();
        return next.handle().pipe(operators_1.tap(() => {
            common_1.Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name);
        }));
    }
}
exports.LoggerInterceptor = LoggerInterceptor;
//# sourceMappingURL=logger.interceptor.js.map