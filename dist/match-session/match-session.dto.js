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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMatchSessionStatusDTO = exports.CreateMatchSessionDTO = exports.GetMatchSessionDTO = void 0;
const class_validator_1 = require("class-validator");
const match_session_entity_1 = require("../entity/match-session.entity");
const film_models_1 = require("../film/film.models");
class GetMatchSessionDTO {
}
exports.GetMatchSessionDTO = GetMatchSessionDTO;
class CreateMatchSessionDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMatchSessionDTO.prototype, "hostId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMatchSessionDTO.prototype, "guestId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateMatchSessionDTO.prototype, "matchLimit", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateMatchSessionDTO.prototype, "category", void 0);
exports.CreateMatchSessionDTO = CreateMatchSessionDTO;
class UpdateMatchSessionStatusDTO {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateMatchSessionStatusDTO.prototype, "matchSessionId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], UpdateMatchSessionStatusDTO.prototype, "status", void 0);
exports.UpdateMatchSessionStatusDTO = UpdateMatchSessionStatusDTO;
//# sourceMappingURL=match-session.dto.js.map