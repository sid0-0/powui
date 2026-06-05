import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export interface StorybookFieldGroupProps {
  withFieldset?: boolean;
  withSeparator?: boolean;
  withError?: boolean;
}

export const StorybookFieldGroup = ({
  withFieldset = false,
  withSeparator = false,
  withError = false,
}: StorybookFieldGroupProps) => {
  const Group = (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fg-hero">Hero name</FieldLabel>
        <Input id="fg-hero" placeholder="e.g. Spider-Man" />
        <FieldDescription>What the world calls you.</FieldDescription>
      </Field>

      <Field>
        <FieldLabel htmlFor="fg-real">Real name</FieldLabel>
        <Input id="fg-real" placeholder="Clark Kent" />
        <FieldDescription>Stays between us.</FieldDescription>
      </Field>

      {withSeparator && <FieldSeparator>then</FieldSeparator>}

      <Field data-invalid={withError || undefined}>
        <FieldLabel htmlFor="fg-email">Email</FieldLabel>
        <Input
          id="fg-email"
          type="email"
          defaultValue={withError ? "not-an-email" : undefined}
          placeholder="you@dailyplanet.com"
          aria-invalid={withError || undefined}
        />
        {withError && (
          <FieldError>That doesn't look like a real email!</FieldError>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="fg-catchphrase">Catchphrase</FieldLabel>
        <Input id="fg-catchphrase" placeholder="Whatever a spider can!" />
      </Field>
    </FieldGroup>
  );

  return (
    <div className="w-[420px]">
      {withFieldset ? (
        <FieldSet>
          <FieldLegend>Sign-up for the league</FieldLegend>
          <FieldDescription>
            Fill it all out, no posers please.
          </FieldDescription>
          {Group}
        </FieldSet>
      ) : (
        Group
      )}
    </div>
  );
};
