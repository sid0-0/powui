import {
  NarratorAlert,
  NarratorAlertDescription,
  NarratorAlertTitle,
} from "@/components/ui/NarratorAlert";

export const StorybookNarratorAlert = () => {
  return (
    <NarratorAlert>
      <NarratorAlertTitle>
        <div className="flex items-center">
          <img src="batman.svg" className="inline-block mr-2 h-4" />
          Bat Signal has been activated
        </div>
      </NarratorAlertTitle>
      <NarratorAlertDescription>
        Weather is cloudy so it's not visible but it sure is up
      </NarratorAlertDescription>
    </NarratorAlert>
  );
};
