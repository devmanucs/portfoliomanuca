import { toast } from "sonner";
import {
  useQuery,
  useMutation,
  useQueryClient,
  type MutationFunctionContext,
  type UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { api } from "@/core/api/axios-instance";
import { ApiError } from "@/core/api/api-error";

export interface UseFetchResponse<T>
  extends UndefinedInitialDataOptions<T, Error, T, readonly unknown[]> {
  route: string;
  config?: AxiosRequestConfig;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

type FetchCrudProps = {
  route: string;
  config?: AxiosRequestConfig;
};

interface UseCustomMutationsProps<T> {
  route: string;
  mutationKey: string[];
  queryInvalidationKeys?: string[];
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  config?: AxiosRequestConfig;
  onMutate?:
    | ((
        variables: {
          formData: T;
          id: string;
        },
        context: MutationFunctionContext,
      ) => void | Promise<void>)
    | undefined;
}

export async function fetchCrud<T>({ route, config }: FetchCrudProps) {
  const response = await api.get<T>(route, {
    ...config,
    showToast: false,
  });

  return response.data;
}

export const useFetch = <T = unknown>({
  route,
  config,
  queryKey,
  sortBy,
  sortOrder = "asc",
  ...rest
}: UseFetchResponse<T>) => {
  return useQuery<T>({
    ...rest,
    queryKey,
    queryFn: async () => {
      const response = await api.get<T>(route, {
        ...config,
        showToast: false,
      });

      const data = response.data;

      if (sortBy && Array.isArray(data)) {
        return [...data].sort((a, b) => {
          const aValue = (a as Record<string, unknown>)[sortBy];
          const bValue = (b as Record<string, unknown>)[sortBy];

          if (aValue === bValue) return 0;

          const comparison = aValue! > bValue! ? 1 : -1;
          return sortOrder === "desc" ? -comparison : comparison;
        }) as T;
      }

      return data;
    },
  });
};

function handleToastError(error: ApiError, defaultMessage: string) {
  toast.error(error instanceof ApiError ? (error.title ?? defaultMessage) : defaultMessage, {
    description: error instanceof ApiError ? error.message : undefined,
  });
}

export function useCreate<T>({
  route,
  queryInvalidationKeys,
  onSuccess,
  onError,
  mutationKey,
  config,
}: UseCustomMutationsProps<T>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn: async ({ formData }: { formData?: T } = {}) => {
      const response = await api.post<T>(route, formData, {
        showToast: false,
        operation: "criar",
        ...config,
      });
      return response.data;
    },
    onSuccess: (data: T) => {
      if (onSuccess) {
        onSuccess(data);
      } else {
        toast.success("Criado com sucesso!");
      }
    },
    onError: (error: ApiError) => {
      if (onError) {
        onError(error);
      } else {
        handleToastError(error, "Ocorreu um erro ao criar!");
      }
    },
    onSettled: () => {
      queryInvalidationKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
  });
}

export function useUpdate<T>({
  route,
  queryInvalidationKeys,
  mutationKey,
  onSuccess,
  onError,
  onMutate,
  config,
}: UseCustomMutationsProps<T>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn: async ({ formData, id }: { formData: T; id: string }) => {
      const response = await api.patch<T>(`${route}/${id}`, formData, {
        showToast: false,
        operation: "atualizar",
        ...config,
      });
      return response.data;
    },
    onSuccess: (data: T) => {
      if (onSuccess) {
        onSuccess(data);
      } else {
        toast.success("Atualizado com sucesso!");
      }
    },
    onError: (error: ApiError) => {
      if (onError) {
        onError(error);
      } else {
        handleToastError(error, "Ocorreu um erro ao atualizar!");
      }
    },
    onMutate(variables, context) {
      onMutate?.(variables, context);
    },
    onSettled: () => {
      queryInvalidationKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
  });
}

export function useDelete<T>({
  route,
  queryInvalidationKeys,
  mutationKey,
  onSuccess,
  onError,
}: UseCustomMutationsProps<T>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn: async ({ id }: { id: string }) => {
      await api.delete(`${route}/${id}`, {
        showToast: false,
        operation: "excluir",
      });
    },
    onSuccess: (data: unknown) => {
      if (onSuccess) {
        onSuccess(data as T);
      } else {
        toast.success("Excluído com sucesso!");
      }
    },
    onError: (error: ApiError) => {
      if (onError) {
        onError(error);
      } else {
        handleToastError(error, "Ocorreu um erro ao excluir!");
      }
    },
    onSettled: () => {
      queryInvalidationKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
  });
}
