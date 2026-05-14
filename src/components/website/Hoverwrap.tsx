"use client";
import { useEffect, useState } from "react";
import { Filters } from "../ui/filters";

export const HoverWrap = ({
  children,
  withAnimation,
}: {
  children: React.ReactNode;
  withAnimation?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationOffset, setAnimationOffset] = useState(
    withAnimation ? 0 : 1.2,
  );

  useEffect(() => {
    if (!isHovered) return;
    let animationFrame: number;
    const animate = () => {
      setAnimationOffset((prev) => Math.min(prev + 0.2, 2));
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [withAnimation, isHovered]);

  useEffect(() => {
    if (!isHovered && withAnimation) {
      setAnimationOffset(0);
    }
  }, [isHovered, withAnimation]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <Filters.ChromaAberr offset={animationOffset}>
          {children}
        </Filters.ChromaAberr>
      ) : (
        children
      )}
    </div>
  );
};
