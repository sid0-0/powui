"use client";
import { useState } from "react";
import { Filters } from "../ui/filters";

const FILTER_EFFECTS = ["ChromaAberr", "Displacement", "Posterize"] as const;
type TFilterEffect = (typeof FILTER_EFFECTS)[number];

const FILTERS = ["ChromaAberr", "Displacement"];

export const RandomFilterWrap = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [filterIndex, setFilterIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  console.log(filterIndex);

  const handleMouseLeave = () => {
    setFilterIndex((prev) => (prev + 1) % FILTERS.length);
    setIsHovered(false);
  };

  const filtered =
    filterIndex === 0 ? (
      <Filters.ChromaAberr
        offset={2}
        containerClassName={className}
        className={className}
      >
        {children}
      </Filters.ChromaAberr>
    ) : filterIndex === 1 ? (
      <Filters.Displacement
        scale={5}
        containerClassName={className}
        className={className}
      >
        {children}
      </Filters.Displacement>
    ) : (
      <Filters.Posterize containerClassName={className} className={className}>
        {children}
      </Filters.Posterize>
    );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {isHovered ? filtered : children}
    </div>
  );
};
