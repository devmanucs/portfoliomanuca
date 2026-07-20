export class ApiError extends Error {
  public status?: number;
  public data?: unknown;
  public operation?: string;
  public originalError?: unknown;
  public title?: string;

  constructor({
    title,
    message,
    status,
    data,
    operation,
    originalError,
  }: {
    title?: string;
    message: string;
    status?: number;
    data?: unknown;
    operation?: string;
    originalError?: unknown;
  }) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.operation = operation;
    this.originalError = originalError;
    this.title = title;
  }
}

export function formatErrorMessage(status: number, operation?: string): string {
  const operationText = operation ? ` ${operation}` : "";

  switch (status) {
    case 401:
      return "Sessão expirada. Por favor, faça login novamente.";
    case 403:
      return `Você não tem permissão para${operationText}.`;
    case 404:
      return `O recurso${operationText} não foi encontrado.`;
    case 422:
      return `Dados inválidos para${operationText}.`;
    case 500:
      return "Erro interno do servidor. Tente novamente mais tarde.";
    case 503:
      return "Serviço temporariamente indisponível.";
    default:
      return `Ocorreu um erro${operationText}. Tente novamente.`;
  }
}
