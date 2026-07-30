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
exports.ExperiencesService = void 0;
const common_1 = require("@nestjs/common");
const entity_mappers_1 = require("../common/mappers/entity.mappers");
const prisma_service_1 = require("../prisma/prisma.service");
const experiences_util_1 = require("./experiences.util");
let ExperiencesService = class ExperiencesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const rows = await this.prisma.experience.findMany({
            include: experiences_util_1.experienceInclude,
            orderBy: { order: 'asc' },
        });
        return rows.map(entity_mappers_1.mapExperience);
    }
    async create(dto) {
        const { skillNames = [], employmentType, startDate, endDate, highlights, ...rest } = dto;
        const row = await this.prisma.experience.create({
            data: {
                ...rest,
                employmentType: employmentType,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                highlights: highlights ?? [],
            },
        });
        if (skillNames.length)
            await (0, experiences_util_1.syncExperienceSkills)(this.prisma, row.id, skillNames);
        return this.findOne(row.id);
    }
    async findOne(id) {
        const row = await this.prisma.experience.findUnique({
            where: { id },
            include: experiences_util_1.experienceInclude,
        });
        if (!row)
            throw new common_1.NotFoundException('Experience not found');
        return (0, entity_mappers_1.mapExperience)(row);
    }
    async update(id, dto) {
        const existing = await this.prisma.experience.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Experience not found');
        const { skillNames, employmentType, startDate, endDate, ...rest } = dto;
        await this.prisma.experience.update({
            where: { id },
            data: {
                ...rest,
                ...(employmentType ? { employmentType: employmentType } : {}),
                ...(startDate ? { startDate: new Date(startDate) } : {}),
                ...(endDate !== undefined ? { endDate: endDate ? new Date(endDate) : null } : {}),
            },
        });
        if (skillNames)
            await (0, experiences_util_1.syncExperienceSkills)(this.prisma, id, skillNames);
        return this.findOne(id);
    }
    async remove(id) {
        await this.prisma.experience.delete({ where: { id } });
    }
};
exports.ExperiencesService = ExperiencesService;
exports.ExperiencesService = ExperiencesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExperiencesService);
//# sourceMappingURL=experiences.service.js.map