import type { EmploymentType as ApiEmploymentType, ProjectFocus, ProjectStatus } from '@portfoliomanuca/types';
import { EmploymentType as DbEmploymentType, ProjectFocus as DbProjectFocus, ProjectStatus as DbProjectStatus } from '@prisma/client';
export declare function mapFocusToApi(focus: DbProjectFocus): ProjectFocus;
export declare function mapFocusToDb(focus: ProjectFocus): DbProjectFocus;
export declare function mapStatusToApi(status: DbProjectStatus): ProjectStatus;
export declare function mapEmploymentToApi(type: DbEmploymentType): ApiEmploymentType;
