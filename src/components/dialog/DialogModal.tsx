import type { ReactElement } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import type { SxProps, Theme } from "@mui/material";
import Loading from "../loading/Loading";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { LoadingContext } from "../loading/context";

type props = {
  isOpen: boolean;
  handleClose: any;
  title: any;
  children: any;
  loading?: boolean;
  dialogSx?: SxProps<Theme> | undefined;
  contentSx?: SxProps<Theme> | undefined;
  titleSx?: SxProps<Theme> | undefined;
  titleHeadSx?: SxProps<Theme> | undefined;
  TitleEl?: ReactElement;
  isFullScreen?: boolean;
};

const DialogModal = ({
  isOpen,
  handleClose,
  title,
  children,
  loading,
  dialogSx = {},
  contentSx = {},
  titleHeadSx = {},
  titleSx = {},
  TitleEl = <></>,
  isFullScreen = false,
}: props) => {
  const { value: contextLoading, setValue: setLoading } = useBoolean();
  return (
    <LoadingContext.Provider value={{ loading: contextLoading, setLoading }}>
      <Dialog
        maxWidth={"xs"}
        style={{ maxWidth: "none" }}
        open={isOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            backgroundColor: "#f5f5f5",
          },
          ...dialogSx,
        }}
        fullScreen={isFullScreen}
      >
        <Loading loading={!!loading || contextLoading} />
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid rgba(112, 112, 112, 0.2)",
            backgroundColor: "#fafafa",
            paddingLeft: "16px !important",
            paddingRight: "16px",
            paddingTop: "10px",
            paddingBottom: "9px",
            "@media print": {
              display: "none",
            },
            ...titleSx,
          }}
        >
          <Grid
            container
            sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}
          >
            <Grid
              item
              xs
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minWidth: 0,
                fontSize: "16px",
                fontWeight: 500,
                paddingTop: "5px",
                ...titleHeadSx,
              }}
            >
              <p>{title}</p>
              {TitleEl}
            </Grid>
            <Grid
              item
              sx={{
                flexShrink: 0,
                pl: 1,
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "5px",
              }}
            >
              <CloseIcon onClick={handleClose} className="cursor-pointer" />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#fafafa",
            padding: "0.75rem 1rem",
            ...contentSx,
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </LoadingContext.Provider>
  );
};

export default DialogModal;
