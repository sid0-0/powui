import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const StorybookAvatar = (props: {
  src: string;
  fallback?: string;
  floating?: boolean;
}) => {
  const { src, fallback, floating = false } = props;
  return (
    <Avatar className="size-24" floating={floating}>
      <AvatarImage src={src} className="scale-150"/>
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
