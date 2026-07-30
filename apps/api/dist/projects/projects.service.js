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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const enum_mappers_1 = require("../common/mappers/enum.mappers");
const entity_mappers_1 = require("../common/mappers/entity.mappers");
const prisma_service_1 = require("../prisma/prisma.service");
const projects_util_1 = require("./projects.util");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPublished() {
        const rows = await this.prisma.project.findMany({
            where: projects_util_1.publishedOnly,
            include: projects_util_1.projectInclude,
            orderBy: [{ featured: 'desc' }, { order: 'asc' }],
        });
        return rows.map(entity_mappers_1.mapProject);
    }
    async findAll() {
        const rows = await this.prisma.project.findMany({
            include: projects_util_1.projectInclude,
            orderBy: [{ order: 'asc' }, { featured: 'desc' }],
        });
        return rows.map(entity_mappers_1.mapProject);
    }
    async findBySlug(slug, publishedOnlyFlag = true) {
        const row = await this.prisma.project.findFirst({
            where: publishedOnlyFlag ? { slug, ...projects_util_1.publishedOnly } : { slug },
            include: projects_util_1.projectInclude,
        });
        if (!row)
            throw new common_1.NotFoundException('Project not found');
        return (0, entity_mappers_1.mapProject)(row);
    }
    async create(dto) {
        const { skillNames = [], focus, status, ...data } = dto;
        const row = await this.prisma.project.create({
            data: {
                ...data,
                focus: (0, enum_mappers_1.mapFocusToDb)(focus),
                status: (status ?? 'PUBLISHED'),
                designDecisions: data.designDecisions ?? [],
                technicalHighlights: data.technicalHighlights ?? [],
            },
            include: projects_util_1.projectInclude,
        });
        if (skillNames.length)
            await (0, projects_util_1.syncProjectSkills)(this.prisma, row.id, skillNames);
        return this.findBySlug(row.slug, false);
    }
    async update(id, dto) {
        const existing = await this.prisma.project.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Project not found');
        const { skillNames, focus, status, ...data } = dto;
        await this.prisma.project.update({
            where: { id },
            data: {
                ...data,
                ...(focus ? { focus: (0, enum_mappers_1.mapFocusToDb)(focus) } : {}),
                ...(status ? { status: status } : {}),
            },
        });
        if (skillNames)
            await (0, projects_util_1.syncProjectSkills)(this.prisma, id, skillNames);
        return this.findBySlug(existing.slug, false);
    }
    async remove(id) {
        await this.prisma.project.delete({ where: { id } });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map