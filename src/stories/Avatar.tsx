import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filters } from "@/components/ui/filters";

export const StorybookAvatar = (props: { src: string; fallback?: string }) => {
  const { src, fallback } = props;
  return (
    <Filters.Displacement>
      <Avatar className="size-24">
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </Filters.Displacement>
  );
};
