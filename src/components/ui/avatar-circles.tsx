import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export function AvatarCircles({ numPeople, className, avatarUrls }: AvatarCirclesProps) {
  return (
    <div className={cn("z-10 flex -space-x-3 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-md hover:scale-110 transition-transform duration-200"
            src={url.imageUrl}
            width={36}
            height={36}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {numPeople !== undefined && (
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-black text-white text-xs font-bold shadow-md">
          +{numPeople}
        </div>
      )}
    </div>
  );
}
