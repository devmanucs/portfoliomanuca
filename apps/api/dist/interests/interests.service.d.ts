import type { IInterest } from '@portfoliomanuca/types';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateInterestDto, UpdateInterestDto } from './dto/interest.dto';
export declare class InterestsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<IInterest[]>;
    create(dto: CreateInterestDto): Promise<IInterest>;
    update(id: string, dto: UpdateInterestDto): Promise<IInterest>;
    remove(id: string): Promise<void>;
}
