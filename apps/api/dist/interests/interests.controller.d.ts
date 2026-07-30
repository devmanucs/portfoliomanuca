import type { IInterest } from '@portfoliomanuca/types';
import { CreateInterestDto, UpdateInterestDto } from './dto/interest.dto';
import { InterestsService } from './interests.service';
export declare class InterestsController {
    private readonly interestsService;
    constructor(interestsService: InterestsService);
    findAll(): Promise<IInterest[]>;
    create(dto: CreateInterestDto): Promise<IInterest>;
    update(id: string, dto: UpdateInterestDto): Promise<IInterest>;
    remove(id: string): Promise<{
        ok: true;
    }>;
}
