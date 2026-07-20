import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";

type Props = {
  loading: boolean;
};

export default function Loading({ loading }: Props) {
  return (
    <>
      {loading ? (
        <div className={styles.loader}>
          <CircularProgress sx={{ color: "#EC9324" }} />
        </div>
      ) : null}
    </>
  );
}
