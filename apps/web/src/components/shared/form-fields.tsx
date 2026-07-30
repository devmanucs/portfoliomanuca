"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

const fieldFormSectionVariants = cva("rounded-lg p-4 md:p-5", {
  variants: {
    variant: {
      bordered: "border border-border/50",
      muted: "bg-muted/15",
      card: "bg-card",
      plain: "",
    },
  },
  defaultVariants: {
    variant: "bordered",
  },
});

type FieldOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

const FieldFormSection = ({
  title,
  description,
  variant = "bordered",
  className,
  children,
}: {
  title?: string;
  description?: string;
  variant?: VariantProps<typeof fieldFormSectionVariants>["variant"];
  className?: string;
  children: ReactNode;
}) => (
  <div className={cn(fieldFormSectionVariants({ variant }), className)}>
    {title ? (
      <FieldLegend variant="label" className="mb-4">
        {title}
      </FieldLegend>
    ) : null}
    {children}
    {description ? (
      <FieldDescription className="mt-4 border-t border-border/40 pt-3 text-xs text-muted-foreground">
        {description}
      </FieldDescription>
    ) : null}
  </div>
);

const FieldFormInput = <T extends FieldValues = FieldValues>({
  label,
  name,
  fieldClassName,
  showError = true,
  control,
  ...props
}: React.ComponentProps<typeof Input> & {
  label?: string;
  fieldClassName?: string;
  name: Path<T>;
  showError?: boolean;
  control?: Control<T>;
}) => {
  const form = useFormContext<T>();

  return (
    <Controller<T>
      name={name}
      control={control ?? form.control}
      render={({ field, fieldState }) => (
        <Field className={cn(fieldClassName)} data-invalid={fieldState.invalid}>
          {label ? <FieldLabel htmlFor={name}>{label}</FieldLabel> : null}
          <Input
            {...props}
            {...field}
            value={field.value ?? ""}
            id={name}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {showError && fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
};

const FieldFormTextarea = <T extends FieldValues = FieldValues>({
  label,
  name,
  fieldClassName,
  showError = true,
  ...props
}: React.ComponentProps<typeof Textarea> & {
  label?: string;
  fieldClassName?: string;
  name: Path<T>;
  showError?: boolean;
}) => {
  const form = useFormContext<T>();

  return (
    <Controller<T>
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className={cn(fieldClassName)} data-invalid={fieldState.invalid}>
          {label ? <FieldLabel htmlFor={name}>{label}</FieldLabel> : null}
          <Textarea
            {...props}
            {...field}
            id={name}
            value={field.value ?? ""}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {showError && fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
};

const FieldFormSelect = <T extends FieldValues = FieldValues>({
  name,
  label,
  options = [],
  fieldClassName,
  placeholder,
  showError = true,
}: {
  label?: string;
  fieldClassName?: string;
  name: Path<T>;
  options?: FieldOption[];
  placeholder?: string;
  showError?: boolean;
}) => {
  const form = useFormContext<T>();

  return (
    <Controller<T>
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className={cn(fieldClassName)} data-invalid={fieldState.invalid}>
          {label ? <FieldLabel htmlFor={name}>{label}</FieldLabel> : null}
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full" id={name}>
              <SelectValue placeholder={placeholder ?? label} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showError && fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
};

const FieldFormCheckbox = <T extends FieldValues = FieldValues>({
  label,
  name,
  fieldClassName,
  showError = true,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof Checkbox> & {
  label?: string;
  fieldClassName?: string;
  name: Path<T>;
  showError?: boolean;
  orientation?: "horizontal" | "vertical";
}) => {
  const form = useFormContext<T>();

  return (
    <Controller<T>
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          orientation={orientation}
          className={cn("w-fit items-center gap-2", fieldClassName)}
          data-invalid={fieldState.invalid}
        >
          {orientation === "vertical" && label ? (
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
          ) : null}
          <Checkbox
            {...props}
            id={name}
            name={field.name}
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.invalid}
          />
          {orientation === "horizontal" && label ? (
            <FieldContent>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
            </FieldContent>
          ) : null}
          {showError && fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
};

const FieldFormSwitch = <T extends FieldValues = FieldValues>({
  label,
  name,
  fieldClassName,
  showError = true,
  flexReverse,
  orientation = "horizontal",
}: {
  label?: string;
  fieldClassName?: string;
  name: Path<T>;
  showError?: boolean;
  flexReverse?: boolean;
  orientation?: "horizontal" | "vertical";
}) => {
  const form = useFormContext<T>();

  return (
    <Controller<T>
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field
          orientation={orientation}
          data-invalid={fieldState.invalid}
          className={cn(
            {
              "flex-row-reverse": flexReverse && orientation === "horizontal",
              "flex-col-reverse": flexReverse && orientation === "vertical",
            },
            fieldClassName,
          )}
        >
          {label ? (
            <FieldContent>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
            </FieldContent>
          ) : null}
          <Switch
            id={name}
            name={field.name}
            checked={field.value === true}
            onCheckedChange={field.onChange}
            aria-invalid={fieldState.invalid}
          />
          {showError && fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
};

export const FormFields = {
  Section: FieldFormSection,
  Input: FieldFormInput,
  Select: FieldFormSelect,
  Checkbox: FieldFormCheckbox,
  Switch: FieldFormSwitch,
  Textarea: FieldFormTextarea,
};
