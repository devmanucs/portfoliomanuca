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
exports.EducationService = void 0;
const common_1 = require("@nestjs/common");
const entity_mappers_1 = require("../common/mappers/entity.mappers");
const prisma_service_1 = require("../prisma/prisma.service");
let EducationService = class EducationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const rows = await this.prisma.education.findMany({ orderBy: { order: 'asc' } });
        return rows.map(entity_mappers_1.mapEducation);
    }
    async create(dto) {
        const row = await this.prisma.education.create({
            data: {
                degree: dto.degree,
                institution: dto.institution,
                periodLabel: dto.periodLabel,
                startDate: dto.startDate ? new Date(dto.startDate) : null,
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                order: dto.order ?? 0,
            },
        });
        return (0, entity_mappers_1.mapEducation)(row);
    }
    async update(id, dto) {
        try {
            const row = await this.prisma.education.update({
                where: { id },
                data: {
                    ...dto,
                    ...(dto.startDate !== undefined
                        ? { startDate: dto.startDate ? new Date(dto.startDate) : null }
                        : {}),
                    ...(dto.endDate !== undefined
                        ? { endDate: dto.endDate ? new Date(dto.endDate) : null }
                        : {}),
                },
            });
            return (0, entity_mappers_1.mapEducation)(row);
        }
        catch {
            throw new common_1.NotFoundException('Education not found');
        }
    }
    async remove(id) {
        await this.prisma.education.delete({ where: { id } });
    }
};
exports.EducationService = EducationService;
exports.EducationService = EducationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EducationService);
//# sourceMappingURL=education.service.js.map