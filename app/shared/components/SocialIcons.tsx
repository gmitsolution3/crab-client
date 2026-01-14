import { Facebook, Instagram, Linkedin, Youtube, Globe } from "lucide-react";
import { JSX } from "react";

type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "website";

interface SocialItem {
  platform: string;
  url: string;
}

interface SocialIconsProps {
  socials: SocialItem[];
  size?: number;
}

const SOCIAL_ICON_MAP: Record<
  SocialPlatform,
  { icon: (size: number) => JSX.Element; label: string }
> = {
  facebook: {
    icon: (size) => <Facebook size={size} />,
    label: "Facebook",
  },
  instagram: {
    icon: (size) => <Instagram size={size} />,
    label: "Instagram",
  },
  linkedin: {
    icon: (size) => <Linkedin size={size} />,
    label: "LinkedIn",
  },
  youtube: {
    icon: (size) => <Youtube size={size} />,
    label: "YouTube",
  },
  website: {
    icon: (size) => <Globe size={size} />,
    label: "Website",
  },
};

const SocialIcons = ({ socials, size = 22 }: SocialIconsProps) => {
  if (!socials?.length) return null;

  return (
    <div className="flex items-center gap-3">
      {socials.map((social, idx) => {
        const key = social.platform.toLowerCase() as SocialPlatform;
        const config = SOCIAL_ICON_MAP[key];

        if (!config || !social.url) return null;

        return (
          <a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={config.label}
            className="w-10 h-10 rounded-full
            bg-linear-to-br from-[#0970B4] to-blue-500
            flex items-center justify-center text-white
            hover:scale-110 hover:shadow-lg
            transition-all duration-300"
          >
            {config.icon(size)}
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
