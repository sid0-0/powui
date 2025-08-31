import {
  NarratorAlert,
  NarratorAlertDescription,
  NarratorAlertTitle,
} from "@/components/ui/NarratorAlert";

export const StorybookNarratorAlert = () => {
  return (
    <NarratorAlert>
      <NarratorAlertTitle>Bat Signal has been activated</NarratorAlertTitle>
      <NarratorAlertDescription>
        Weather is cloudy so it's not visible but it sure is up
      </NarratorAlertDescription>
    </NarratorAlert>
  );
};
