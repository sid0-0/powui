import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const CHECKLIST = [
  { label: "Fight villains", value: "fight" },
  { label: "Save the city", value: "save" },
  { label: "Eat pizza", value: "pizza" },
  { label: "Have a happy ending", value: "happy_ending" },
];

export const StorybookCheckbox = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([
    "fight",
    "pizza",
  ]);
  const checkboxList = useMemo(
    () =>
      CHECKLIST.map((item) => {
        return (
          <Checkbox
            key={item.value}
            checked={checkedItems.includes(item.value)}
            label={item.label}
            onCheckedChange={() => {
              if (item.value === "happy_ending") {
                return;
              }
              setCheckedItems((prev) => {
                if (prev.includes(item.value)) {
                  return prev.filter((i) => i !== item.value);
                } else {
                  return [...prev, item.value];
                }
              });
            }}
          />
        );
      }),
    [checkedItems]
  );
  return (
    <div className="bg-orange-300 p-12">
      <h2>Superhero To-Do List:</h2>
      <br />
      <div className="flex flex-col items-baseline">{checkboxList}</div>
    </div>
  );
};
