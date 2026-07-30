export declare class CreateSkillDto {
    name: string;
    category: string;
    level?: number;
    iconKey?: string;
    color?: string;
    order?: number;
}
export declare class UpdateSkillDto {
    name?: string;
    category?: string;
    level?: number | null;
    iconKey?: string | null;
    color?: string | null;
    order?: number;
}
