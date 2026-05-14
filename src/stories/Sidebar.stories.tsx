import type { StoryObj } from "@storybook/react-vite";
import {
  Crown,
  Sword,
  Shield,
  Brain,
  Anchor,
  Heart,
  Zap,
  Target,
  Leaf,
  Wrench,
  Star,
  Moon,
  Cpu,
  Music,
  Compass,
  Gem,
} from "lucide-react";
import { StorybookSidebar } from "./Sidebar";

const meta = {
  title: "Example/Sidebar",
  component: StorybookSidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    sidebarWidth: { control: { type: "text" } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const CharacterContent = ({
  real_name,
  role,
  powers,
  bio,
  traits,
}: {
  real_name: string;
  role: string;
  powers: string[];
  bio: string;
  traits: string[];
}) => (
  <div className="min-h-80 p-4 spotty-bg-[#eab308] size-full">
    <div className="space-y-0.5">
      <p className="text-xs font-black uppercase tracking-widest opacity-50">{role}</p>
      <p className="text-sm font-bold">{real_name}</p>
    </div>
    <div>
      <p className="text-xs font-black uppercase tracking-widest mb-1">Powers</p>
      <ul className="space-y-0.5">
        {powers.map((p) => (
          <li key={p} className="text-sm flex gap-1.5">
            <span className="shrink-0 font-black">▸</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <p className="text-xs font-black uppercase tracking-widest mb-1">Bio</p>
      <p className="text-sm">{bio}</p>
    </div>
    <div>
      <p className="text-xs font-black uppercase tracking-widest mb-1">Traits</p>
      <div className="flex flex-wrap gap-1">
        {traits.map((t) => (
          <span
            key={t}
            className="text-xs border-2 border-black px-2 py-0.5 font-bold bg-white/70"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const BulletContent = ({ title, bullets }: { title: string; bullets: string[] }) => (
  <div className="min-h-80 p-4 spotty-bg-[#eab308] size-full">
    <p className="font-black text-sm uppercase tracking-widest">{title}</p>
    <ul className="space-y-1">
      {bullets.map((b) => (
        <li key={b} className="text-sm flex gap-1.5">
          <span className="shrink-0 font-black">▸</span>
          {b}
        </li>
      ))}
    </ul>
  </div>
);

const characters = [
  {
    id: "star-lord",
    name: "Star-Lord",
    real_name: "Peter Quill",
    icon: <Crown />,
    roleGroup: "combat",
    role: "Leader / Tactical Improviser",
    powers: [
      "Skilled combatant and marksman",
      "Advanced alien weaponry (Quad Blasters)",
      "Jet boot thrusters",
      "Partial Celestial heritage (godlike power when tapped)",
    ],
    bio: "Human abducted from Earth and raised by space pirates. Becomes the charismatic, mixtape-loving leader of the Guardians after discovering his mixed Celestial heritage.",
    traits: ["Humorous", "Rebellious", "Loyal", "Impulsive"],
  },
  {
    id: "gamora",
    name: "Gamora",
    real_name: "Gamora Zen Whoberi Ben Titan",
    icon: <Sword />,
    roleGroup: "combat",
    role: "Elite Assassin / Close Combat",
    powers: [
      "Peak physical strength and agility",
      "Master of all known combat forms",
      "Cybernetic enhancements",
      "Godslayer sword proficiency",
    ],
    bio: "Adopted daughter of Thanos, trained as his deadliest assassin. Rebelled against him and joined the Guardians seeking redemption and to protect the universe.",
    traits: ["Disciplined", "Focused", "Stoic", "Strong moral compass"],
  },
  {
    id: "drax",
    name: "Drax",
    real_name: "Arthur Douglas",
    icon: <Shield />,
    roleGroup: "combat",
    role: "Heavy Bruiser / Frontline Tank",
    powers: [
      "Superhuman strength and durability",
      "Expert melee combatant",
      "Pain resistance",
      "Literal interpretation of everything",
    ],
    bio: "A warrior consumed by vengeance after Thanos destroyed his family. His literal-minded honesty and brute force make him both invaluable and unpredictable.",
    traits: ["Literal-minded", "Honest", "Fearless", "Emotionally driven"],
  },
  {
    id: "rocket",
    name: "Rocket",
    real_name: "Subject 89P13",
    icon: <Brain />,
    roleGroup: "support",
    role: "Engineer / Weapons Specialist",
    powers: [
      "Genius-level engineering and tactical mind",
      "Expert weapons designer and pilot",
      "Enhanced reflexes and agility",
      "Raccoon-tier climbing and stealth",
    ],
    bio: "Genetically modified against his will, Rocket channels his pain into brilliance. The team's strategist, pilot, and arms dealer, with a surprisingly deep loyalty beneath the sarcasm.",
    traits: ["Sarcastic", "Cynical", "Brilliant", "Emotionally guarded"],
  },
  {
    id: "groot",
    name: "Groot",
    real_name: "Groot (Flora Colossus)",
    icon: <Anchor />,
    roleGroup: "support",
    role: "Tank / Defensive Support",
    powers: [
      "Regenerative healing factor",
      "Plant matter manipulation",
      "Superhuman strength and durability",
      "Full body reconstruction after death",
    ],
    bio: "A gentle giant of few words — literally just three. Forms a profound bond with Rocket. His willingness to sacrifice himself and be reborn makes him the team's most resilient member.",
    traits: ["Loyal", "Protective", "Gentle-hearted", "Quietly wise"],
  },
  {
    id: "mantis",
    name: "Mantis",
    real_name: "Mantis",
    icon: <Heart />,
    roleGroup: "support",
    role: "Empath / Utility Support",
    powers: [
      "Empathy — sense and influence emotions via touch",
      "Sleep induction on contact",
      "Enhanced perception",
      "Limited precognitive sensitivity",
    ],
    bio: "Raised in isolation by Ego, she discovers her own personhood through the Guardians. Her empathic powers make her the team's secret emotional anchor.",
    traits: ["Kind", "Naive", "Empathetic", "Quietly courageous"],
  },
  {
    id: "nebula",
    name: "Nebula",
    real_name: "Nebula (adoptee of Thanos)",
    icon: <Cpu />,
    roleGroup: "combat",
    role: "Cybernetic Assassin / Anti-Hero",
    powers: [
      "Extensive cybernetic body augmentation",
      "Regenerative self-repair of mechanical parts",
      "Master-level combatant and weapons expert",
      "Tactical intelligence and strategic planning",
    ],
    bio: "Forced to replace parts of herself every time she lost to Gamora in training. Carries a lifetime of pain and resentment — but finds, slowly, that family can still mean something.",
    traits: ["Ruthless", "Determined", "Wounded", "Fiercely loyal (eventually)"],
  },
  {
    id: "yondu",
    name: "Yondu",
    real_name: "Yondu Udonta",
    icon: <Music />,
    roleGroup: "support",
    role: "Ravager Captain / Surrogate Father",
    powers: [
      "Yaka Arrow — telepathically controlled via fin and whistle",
      "Skilled tactician and experienced space pirate",
      "Ravager network and contacts across the galaxy",
      "Exceptional physical combatant",
    ],
    bio: "A Centaurian outlaw who abducted Peter Quill but couldn't bring himself to deliver him to Ego. Rough, roguish, and quietly devoted — the dad Peter never knew he had.",
    traits: ["Gruff", "Self-sacrificing", "Cunning", "Deeply loving"],
  },
  {
    id: "kraglin",
    name: "Kraglin",
    real_name: "Kraglin Obfonteri",
    icon: <Compass />,
    roleGroup: "support",
    role: "Ravager First Mate / Arrow Wielder",
    powers: [
      "Inheritor of Yondu's Yaka Arrow and fin",
      "Still mastering arrow control (it goes sideways sometimes)",
      "Loyal crewman with decades of space combat experience",
      "Piloting and navigation skills",
    ],
    bio: "Yondu's loyal first mate who fumbled his way into becoming a hero. Not the sharpest fin on the head, but his heart is always in the right place — even when the arrow isn't.",
    traits: ["Loyal", "Earnest", "Awkward", "Steadfast"],
  },
  {
    id: "adam-warlock",
    name: "Adam Warlock",
    real_name: "Adam (created by Sovereign)",
    icon: <Gem />,
    roleGroup: "combat",
    role: "Perfect Being / Reluctant Ally",
    powers: [
      "Superhuman strength, speed, and durability",
      "Energy projection and flight",
      "Rapid cocoon-based regeneration",
      "Cosmic awareness (developing)",
    ],
    bio: "Engineered by the Sovereign to be their perfect weapon. Hatched too soon and still naive as a child, he must decide what kind of being he chooses to become.",
    traits: ["Powerful", "Childlike", "Conflicted", "Evolving"],
  },
];

const allGroups = [
  {
    items: characters.map((c) => ({
      id: c.id,
      icon: c.icon,
      label: c.name,
      content: <CharacterContent {...c} />,
    })),
  },
];

const groupedGroups = [
  {
    label: "Combat",
    items: characters
      .filter((c) => c.roleGroup === "combat")
      .map((c) => ({
        id: c.id,
        icon: c.icon,
        label: c.name,
        content: <CharacterContent {...c} />,
      })),
  },
  {
    label: "Support",
    items: characters
      .filter((c) => c.roleGroup === "support")
      .map((c) => ({
        id: c.id,
        icon: c.icon,
        label: c.name,
        content: <CharacterContent {...c} />,
      })),
  },
];

const nestedGroups = [
  {
    items: [
      {
        id: "star-lord",
        icon: <Crown />,
        label: "Star-Lord",
        content: <CharacterContent {...characters[0]} />,
        subItems: [
          {
            id: "star-lord-arsenal",
            icon: <Zap />,
            label: "Arsenal",
            content: (
              <BulletContent
                title="Star-Lord's Arsenal"
                bullets={[
                  "Twin Quad Blasters — energy pistols with adjustable output",
                  "Jet boot thrusters — short-burst flight and maneuverability",
                  "Gravity mine — area denial explosive",
                  "Translator implant — universal language understanding",
                  "Awesome Mix Vol. 1 & 2 — mandatory for all operations",
                ]}
              />
            ),
          },
          {
            id: "star-lord-heritage",
            icon: <Star />,
            label: "Heritage",
            content: (
              <BulletContent
                title="Celestial Heritage"
                bullets={[
                  "Father: Ego the Living Planet (Celestial)",
                  "Mother: Meredith Quill (human)",
                  "Inherited light-manipulation abilities",
                  "Can briefly channel Celestial energy",
                  "Mortality restored after Ego's death",
                ]}
              />
            ),
          },
        ],
      },
      {
        id: "rocket",
        icon: <Brain />,
        label: "Rocket",
        content: <CharacterContent {...characters[3]} />,
        subItems: [
          {
            id: "rocket-weapons",
            icon: <Target />,
            label: "Weapons",
            content: (
              <BulletContent
                title="Rocket's Custom Armory"
                bullets={[
                  "Hadron Enforcer — his prized BFG",
                  "Prototype rocket launcher (\"borrowed\" from wherever\")",
                  "Improvised explosives — creative use of everyday items",
                  "Milano's weapon systems (self-upgraded)",
                ]}
              />
            ),
          },
          {
            id: "rocket-tech",
            icon: <Wrench />,
            label: "Tech",
            content: (
              <BulletContent
                title="Engineering Feats"
                bullets={[
                  "Rebuilt the Milano's jump drive mid-battle",
                  "Constructed a working bomb from a power core in minutes",
                  "Hacked a Kree security grid using a prison guard's eye",
                  "Upgraded Groot's regeneration pod design",
                ]}
              />
            ),
          },
        ],
      },
      {
        id: "groot",
        icon: <Anchor />,
        label: "Groot",
        content: <CharacterContent {...characters[4]} />,
        subItems: [
          {
            id: "groot-abilities",
            icon: <Leaf />,
            label: "Abilities",
            content: (
              <BulletContent
                title="What Groot Can Do"
                bullets={[
                  "Extend and harden limbs as melee weapons",
                  "Regenerate from a single twig",
                  "Absorb and redirect physical impacts",
                  "Generate bioluminescent light",
                  "Enccase others in protective wooden shell",
                ]}
              />
            ),
          },
          {
            id: "groot-communication",
            icon: <Moon />,
            label: "Language",
            content: (
              <BulletContent
                title='\"I Am Groot\" — A Translation Guide'
                bullets={[
                  "\"I am Groot\" (warm) → I love you all",
                  "\"I am Groot\" (rising tone) → We should leave. Now.",
                  "\"I am Groot\" (firm) → I will sacrifice myself",
                  "\"I am Groot\" (tiny voice) → I am Baby Groot and I don't remember anything",
                  "Rocket is the only one who truly understands",
                ]}
              />
            ),
          },
        ],
      },
      {
        id: "nebula",
        icon: <Cpu />,
        label: "Nebula",
        content: <CharacterContent {...characters[6]} />,
        subItems: [
          {
            id: "nebula-augments",
            icon: <Wrench />,
            label: "Augments",
            content: (
              <BulletContent
                title="Cybernetic Modifications"
                bullets={[
                  "Optical implant — enhanced targeting and data analysis",
                  "Neural processor — tactical threat modeling",
                  "Reinforced skeletal frame — absorbs massive impacts",
                  "Cybernetic arm — interchangeable tools and weapons",
                  "Self-repairing tissue — faster than biological healing",
                ]}
              />
            ),
          },
          {
            id: "nebula-gamora",
            icon: <Sword />,
            label: "vs. Gamora",
            content: (
              <BulletContent
                title="The Rivalry"
                bullets={[
                  "Lost every training fight to Gamora as children",
                  "Thanos replaced a body part after each defeat",
                  "Built resentment for decades — but not at Gamora",
                  "Eventually understood the real enemy was Thanos",
                  "Fought alongside Gamora to save the universe in Endgame",
                ]}
              />
            ),
          },
        ],
      },
      {
        id: "yondu",
        icon: <Music />,
        label: "Yondu",
        content: <CharacterContent {...characters[7]} />,
        subItems: [
          {
            id: "yondu-arrow",
            icon: <Zap />,
            label: "Yaka Arrow",
            content: (
              <BulletContent
                title="The Yaka Arrow"
                bullets={[
                  "Controlled by fin-amplified Centaurian whistling",
                  "Moves at near-projectile speed with pinpoint accuracy",
                  "Can eliminate entire rooms without Yondu moving",
                  "Fin was later inherited by Kraglin",
                  "Demonstrated as the most terrifying weapon in the MCU (Vol. 1 finale)",
                ]}
              />
            ),
          },
          {
            id: "yondu-ravagers",
            icon: <Compass />,
            label: "Ravagers",
            content: (
              <BulletContent
                title="The Ravager Code"
                bullets={[
                  "Ravagers don't trade in children — the code Yondu broke",
                  "Exiled by Stakar Ogord for delivering children to Ego",
                  "Led his own crew for decades across the galaxy",
                  "Sacrificed his space suit so Peter could survive the void",
                  "Honored with a full Ravager funeral — Stakar's redemption",
                ]}
              />
            ),
          },
        ],
      },
    ],
  },
];

export const Left: Story = {
  args: {
    groups: allGroups,
    side: "left",
  },
};

export const WithIcons: Story = {
  args: {
    groups: allGroups,
    side: "left",
    sidebarWidth: "160px",
  },
};

export const Grouped: Story = {
  args: {
    groups: groupedGroups,
    side: "left",
    sidebarWidth: "160px",
  },
};

export const Nested: Story = {
  args: {
    groups: nestedGroups,
    side: "left",
    sidebarWidth: "160px",
  },
};
