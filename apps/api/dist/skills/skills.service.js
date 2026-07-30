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
exports.SkillsService = void 0;
const common_1 = require("@nestjs/common");
const entity_mappers_1 = require("../common/mappers/entity.mappers");
const prisma_service_1 = require("../prisma/prisma.service");
let SkillsService = class SkillsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const rows = await this.prisma.skill.findMany({ orderBy: { order: 'asc' } });
        return rows.map(entity_mappers_1.mapSkill);
    }
    async create(dto) {
        const row = await this.prisma.skill.create({ data: dto });
        return (0, entity_mappers_1.mapSkill)(row);
    }
    async update(id, dto) {
        try {
            const row = await this.prisma.skill.update({ where: { id }, data: dto });
            return (0, entity_mappers_1.mapSkill)(row);
        }
        catch {
            throw new common_1.NotFoundException('Skill not found');
        }
    }
    async remove(id) {
        await this.prisma.skill.delete({ where: { id } });
    }
};
exports.SkillsService = SkillsService;
exports.SkillsService = SkillsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SkillsService);
//# sourceMappingURL=skills.service.js.map