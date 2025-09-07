import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const StorybookAvatar = (props: { src: string; fallback?: string }) => {
  const { src, fallback } = props;
  return (
    <Avatar className="size-24">
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
