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
exports.ExperiencesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const experience_dto_1 = require("./dto/experience.dto");
const experiences_service_1 = require("./experiences.service");
let ExperiencesController = class ExperiencesController {
    experiencesService;
    constructor(experiencesService) {
        this.experiencesService = experiencesService;
    }
    findAll() {
        return this.experiencesService.findAll();
    }
    create(dto) {
        return this.experiencesService.create(dto);
    }
    update(id, dto) {
        return this.experiencesService.update(id, dto);
    }
    async remove(id) {
        await this.experiencesService.remove(id);
        return { ok: true };
    }
};
exports.ExperiencesController = ExperiencesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExperiencesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [experience_dto_1.CreateExperienceDto]),
    __metadata("design:returntype", Promise)
], ExperiencesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, experience_dto_1.UpdateExperienceDto]),
    __metadata("design:returntype", Promise)
], ExperiencesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExperiencesController.prototype, "remove", null);
exports.ExperiencesController = ExperiencesController = __decorate([
    (0, common_1.Controller)('experiences'),
    __metadata("design:paramtypes", [experiences_service_1.ExperiencesService])
], ExperiencesController);
//# sourceMappingURL=experiences.controller.js.map