export declare class CreateEducationDto {
    degree: string;
    institution: string;
    periodLabel?: string;
    startDate?: string;
    endDate?: string;
    order?: number;
}
export declare class UpdateEducationDto {
    degree?: string;
    institution?: string;
    periodLabel?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    order?: number;
}
