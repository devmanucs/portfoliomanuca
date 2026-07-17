import type {
  EmploymentType as ApiEmploymentType,
  ProjectFocus,
  ProjectStatus,
} from '@portfoliomanuca/types';
import {
  EmploymentType as DbEmploymentType,
  ProjectFocus as DbProjectFocus,
  ProjectStatus as DbProjectStatus,
} from '@prisma/client';

const focusToApi: Record<DbProjectFocus, ProjectFocus> = {
  DESIGN: 'design',
  DEVELOPMENT: 'development',
  HYBRID: 'hybrid',
};

const focusToDb: Record<ProjectFocus, DbProjectFocus> = {
  design: DbProjectFocus.DESIGN,
  development: DbProjectFocus.DEVELOPMENT,
  hybrid: DbProjectFocus.HYBRID,
};

export function mapFocusToApi(focus: DbProjectFocus): ProjectFocus {
  return focusToApi[focus];
}

export function mapFocusToDb(focus: ProjectFocus): DbProjectFocus {
  return focusToDb[focus];
}

export function mapStatusToApi(status: DbProjectStatus): ProjectStatus {
  return status;
}

export function mapEmploymentToApi(type: DbEmploymentType): ApiEmploymentType {
  return type;
}
