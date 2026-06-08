import { Filters } from "@/components/ui/filters";
import { Input } from "@/components/ui/input";

export interface StorybookInputProps {
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  invalid?: boolean;
  type?: "text" | "email" | "password" | "number" | "search";
}

export const StorybookInput = ({
  placeholder = "Type something...",
  defaultValue,
  disabled = false,
  invalid = false,
  type = "text",
}: StorybookInputProps) => {
  return (
    <Filters.Displacement scale={1.5} frequency={0.05}>
      <div className="w-[320px]">
        <Input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={invalid || undefined}
        />
      </div>
    </Filters.Displacement>
  );
};
