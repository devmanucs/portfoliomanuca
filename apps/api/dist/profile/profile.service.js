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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const entity_mappers_1 = require("../common/mappers/entity.mappers");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfileService = class ProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile() {
        const profile = await this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        return (0, entity_mappers_1.mapProfile)(profile);
    }
    async updateProfile(dto) {
        const existing = await this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });
        if (!existing)
            throw new common_1.NotFoundException('Profile not found');
        const profile = await this.prisma.profile.update({ where: { id: existing.id }, data: dto });
        return (0, entity_mappers_1.mapProfile)(profile);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map