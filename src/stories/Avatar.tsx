import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const StorybookAvatar = () => {
  return (
    <div className="flex gap-16">
      <Avatar className="size-24">
        <AvatarImage src="https://static.dc.com/dc/files/default_images/Char_Thumb_WonderWoman_20190116_5c3fc6aa51d064.76155401.jpg" />
        <AvatarFallback>Wonder Woman</AvatarFallback>
      </Avatar>
      <Avatar className="size-24">
        <AvatarImage src="no_picture_exists_of_him" />
        <AvatarFallback>Hawley Griffin</AvatarFallback>
      </Avatar>
      <div className="flex -space-x-8">
        <Avatar className="size-24">
          <AvatarImage src="https://static.dc.com/dc/files/default_images/Char_Thumb_WonderWoman_20190116_5c3fc6aa51d064.76155401.jpg" />
          <AvatarFallback>Wonder Woman</AvatarFallback>
        </Avatar>
        <Avatar className="size-24">
          <AvatarImage src="https://static.dc.com/dc/files/default_images/Char_Thumb_Superman_5c3fc2758f6984.90100206.jpg" />
          <AvatarFallback>Superman</AvatarFallback>
        </Avatar>
        <Avatar className="size-24">
          <AvatarImage src="https://static.dc.com/dc/files/default_images/Char_Thumb_Batman_20190116_5c3fc4b40fae42.85141247.jpg" />
          <AvatarFallback>Batman</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
