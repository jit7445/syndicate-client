import type { CSSProperties } from "react";
import Button from "../button/Button";
import DownloadIcon from "../../icons/Download/Download";

type DownloadButtonProps = {
  label?: string;
  onClick: () => void;
  styles?: CSSProperties;
};

export default function DownloadButton({
  label = "Download",
  onClick,
  styles,
}: DownloadButtonProps) {
  return (
    <Button
      variant="outlined"
      label={label}
      startIcon={<DownloadIcon fontSize="small" />}
      onClick={onClick}
      styles={styles}
    />
  );
}
