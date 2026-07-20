import type { CSSProperties } from "react";

interface DescriptionIconProps {
  style?: CSSProperties;
  fontSize?: "small" | "medium" | "large";
}

const SIZE_MAP: Record<"small" | "medium" | "large", number> = {
  small: 20,
  medium: 24,
  large: 32,
};

const DescriptionIcon = ({
  style,
  fontSize = "medium",
}: DescriptionIconProps) => {
  const size = SIZE_MAP[fontSize];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      style={style}
    >
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  );
};

export default DescriptionIcon;
