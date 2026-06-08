import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Filters } from "@/components/ui/filters";
import { Input } from "@/components/ui/input";

export interface StorybookFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  orientation?: "vertical" | "horizontal" | "responsive";
}

export const StorybookField = ({
  label = "Hero name",
  description = "What does the world call you?",
  placeholder = "e.g. Spider-Man",
  defaultValue,
  error,
  orientation = "vertical",
}: StorybookFieldProps) => {
  const id = "storybook-field";
  return (
    <Filters.Displacement scale={1.5} frequency={0.05}>
      <div className="w-[420px]">
        <Field orientation={orientation} data-invalid={!!error || undefined}>
          {orientation === "horizontal" || orientation === "responsive" ? (
            <>
              <FieldContent>
                <FieldLabel htmlFor={id}>{label}</FieldLabel>
                {description && (
                  <FieldDescription>{description}</FieldDescription>
                )}
                {error && <FieldError>{error}</FieldError>}
              </FieldContent>
              <Input
                id={id}
                placeholder={placeholder}
                defaultValue={defaultValue}
                aria-invalid={!!error || undefined}
              />
            </>
          ) : (
            <>
              <FieldLabel htmlFor={id}>{label}</FieldLabel>
              <Input
                id={id}
                placeholder={placeholder}
                defaultValue={defaultValue}
                aria-invalid={!!error || undefined}
              />
              {description && (
                <FieldDescription>{description}</FieldDescription>
              )}
              {error && <FieldError>{error}</FieldError>}
            </>
          )}
        </Field>
      </div>
    </Filters.Displacement>
  );
};
