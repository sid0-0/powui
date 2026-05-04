import type { StoryObj } from "@storybook/react-vite";
import { StorybookTabs } from "./Tabs";

const meta = {
  title: "Example/Tabs",
  component: StorybookTabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tabsPlacement: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    tabWidth: { control: { type: "text" } },
    tabHeight: { control: { type: "text" } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const CharacterContent = ({
  real_name,
  powers,
  bio,
  traits,
  symbol,
  alignment,
}: {
  real_name: string;
  powers: string;
  bio: string;
  traits: string[];
  symbol: string;
  alignment: string;
}) => (
  <div className="space-y-2 min-h-80 p-4 spotty-bg-[#eab308]">
    <p>
      <strong>Real Name:</strong> {real_name}
    </p>
    <p>
      <strong>Powers:</strong> {powers}
    </p>
    <p>
      <strong>Bio:</strong> {bio}
    </p>
    <p>
      <strong>Traits:</strong> {traits.join(", ")}
    </p>
    <p>
      <strong>Symbol:</strong> {symbol}
    </p>
    <p>
      <strong>Alignment:</strong> {alignment}
    </p>
  </div>
);

const data = [
  {
    name: "Rorschach",
    real_name: "Walter Kovacs",
    powers: "None (Peak human condition, detective skills)",
    bio: "Rorschach is a deeply disturbed vigilante who believes in black-and-white morality. He is known for his iconic inkblot mask and his uncompromising views on justice. He has no superpowers but is an expert in hand-to-hand combat, stealth, and investigation. He follows his own strict moral code, which often leads to conflict with others, especially his former comrades. Rorschach's mask and persona represent his belief that the world is as chaotic as an inkblot, and it can’t be understood without looking deeply into it.",
    traits: ["Determined", "Uncompromising", "Paranoid", "Cynical"],
    symbol: "Inkblot mask",
    alignment: "Anti-hero",
  },
  {
    name: "Dr. Manhattan",
    real_name: "Jon Osterman",
    powers:
      "Superhuman strength, ability to manipulate matter, omniscient awareness, teleportation",
    bio: "Dr. Manhattan is a god-like being who gained his powers after a tragic accident in a nuclear physics experiment. He has near-absolute control over matter, can manipulate energy, and is essentially omniscient, able to see past, present, and future simultaneously. His detachment from humanity grows as his powers increase, leading him to become increasingly indifferent to the struggles of people. His existence poses significant moral and philosophical dilemmas about free will, destiny, and the nature of existence.",
    traits: ["Detached", "Omnipotent", "Philosophical", "Emotionally distant"],
    symbol: "Atom symbol",
    alignment: "Anti-hero",
  },
  {
    name: "Nite Owl",
    real_name: "Dan Dreiberg",
    powers: "Advanced gadgetry, peak human condition, tactical expertise",
    bio: "Dan Dreiberg is a former costumed vigilante who takes on the persona of Nite Owl. Inspired by the original Nite Owl, Hollis Mason, Dan is a skilled detective and a brilliant tactician. He uses a variety of high-tech gadgets, including an advanced flying ship, and is a formidable hand-to-hand combatant. Despite his physical limitations, he remains a symbol of hope and justice. After the Keene Act, which outlawed masked vigilantes, Dan goes into retirement, but eventually returns when the old team is reassembled.",
    traits: ["Courageous", "Empathetic", "Resourceful", "Idealistic"],
    symbol: "Owl emblem",
    alignment: "Hero",
  },
  {
    name: "The Comedian",
    real_name: "Edward Morgan Blake",
    powers: "Superhuman strength, military training, tactical genius",
    bio: "Edward Morgan Blake, also known as The Comedian, is a morally ambiguous character who served as a government-sanctioned hero. He was deeply involved in political manipulation and has a history of violence, brutality, and dark humor. Despite his status as a hero, The Comedian is responsible for numerous atrocities, including the death of a pregnant woman and the massacre of innocent people. His actions reflect the darker side of heroism, and his death at the beginning of the story sets off the chain of events that re-assembles the old superhero team.",
    traits: ["Cynical", "Violent", "Tactical", "Amoral"],
    symbol: "Smiling face mask",
    alignment: "Anti-hero",
  },
  {
    name: "Silk Spectre",
    real_name: "Laurie Juspeczyk",
    powers: "Agility, strength, hand-to-hand combat",
    bio: "Laurie Juspeczyk, the daughter of the original Silk Spectre, Sally Jupiter, takes on her mother’s mantle. Laurie is a highly skilled fighter, thanks to her training, but she struggles with her place in the world as a superhero and her relationship with Dr. Manhattan. Throughout the story, Laurie grapples with her past, her relationships, and her evolving understanding of her role in a morally complex world. She represents the human side of the hero complex, torn between duty and personal desires.",
    traits: ["Independent", "Resilient", "Conflicted", "Courageous"],
    symbol: "Silk Spectre emblem",
    alignment: "Hero",
  },
  {
    name: "Ozymandias",
    real_name: "Adrian Veidt",
    powers: "Genius intellect, strategic mind, expert in hand-to-hand combat",
    bio: "Adrian Veidt, also known as Ozymandias, is considered the smartest man in the world. Formerly a masked hero, he eventually abandons the vigilante lifestyle and builds a massive business empire. Ozymandias is driven by the belief that he must save the world from itself, even if it means sacrificing countless lives. His grand plan to avert nuclear war involves a horrific plot, showcasing his belief that the ends justify the means. Ozymandias is a master manipulator, and his intelligence and calculated nature make him both a hero and a villain, depending on perspective.",
    traits: ["Intelligent", "Calculating", "Charismatic", "Idealistic"],
    symbol: "Pyramid emblem",
    alignment: "Villain (with a complex moral code)",
  },
  {
    name: "Hooded Justice",
    real_name: "Unknown",
    powers: "Peak human condition, martial arts expertise",
    bio: "Hooded Justice is one of the original Minutemen, a group of vigilantes who preceded the Watchmen. His true identity is unknown, though it is implied he was a black man who used his position to fight for justice in a time of rampant racism and corruption. Hooded Justice's role in the story is largely symbolic of the systemic oppression and violence faced by marginalized groups, and his legacy is one of unsung heroism.",
    traits: ["Brave", "Anonymous", "Mysterious", "Revolutionary"],
    symbol: "Hooded mask",
    alignment: "Hero",
  },
  {
    name: "The Black Freighter",
    real_name: "Fictional character within the story",
    powers: "None",
    bio: "The Black Freighter is a comic-within-a-comic featured throughout *Watchmen*. The story within tells of a sailor’s journey as he attempts to return home after a shipwreck. While not a traditional character in the Watchmen universe, the Black Freighter’s narrative mirrors the themes of doom, survival, and moral decay seen in the main plot. The sailor’s journey and his descent into madness act as an allegory for the main characters’ struggles.",
    traits: ["Desperate", "Cynical", "Mad", "Survival-driven"],
    symbol: "Black Freighter ship",
    alignment: "Tragic anti-hero",
  },
];

export const Base: Story = {
  args: {
    tabs: data.map((char) => ({
      title: char.name,
      content: <CharacterContent {...char} />,
    })),
  },
};

export const Vertical: Story = {
  args: {
    tabs: data.map((char) => ({
      title: char.name,
      content: <CharacterContent {...char} />,
    })),
    tabsPlacement: "left",
  },
};
