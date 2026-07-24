import { CircularProgress } from "@mui/material";
import { COLORS } from "../../constants/colors";
import styles from "./styles.module.scss";

type Props = {
  loading: boolean;
};

export default function Loading({ loading }: Props) {
  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <CircularProgress sx={{ color: COLORS.accent2 }} />
        </div>
      ) : null}
    </>
  );
}
