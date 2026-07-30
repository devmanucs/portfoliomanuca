import type { EmploymentType } from '@portfoliomanuca/types';
export declare class CreateExperienceDto {
    company: string;
    role: string;
    location?: string;
    employmentType: EmploymentType;
    periodLabel?: string;
    startDate: string;
    endDate?: string;
    description: string;
    highlights?: string[];
    order?: number;
    includeInResume?: boolean;
    skillNames?: string[];
}
export declare class UpdateExperienceDto {
    company?: string;
    role?: string;
    location?: string | null;
    employmentType?: EmploymentType;
    periodLabel?: string | null;
    startDate?: string;
    endDate?: string | null;
    description?: string;
    highlights?: string[];
    order?: number;
    includeInResume?: boolean;
    skillNames?: string[];
}
