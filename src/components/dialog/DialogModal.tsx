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
import {
  dialogPaperSx,
  dialogTitleSx,
  dialogTitleHeadSx,
  dialogCloseGridSx,
  dialogContentSx,
} from "./DialogModal.styles";

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
          ...dialogPaperSx,
          ...dialogSx,
        }}
        fullScreen={isFullScreen}
      >
        <Loading loading={!!loading || contextLoading} />
        <DialogTitle
          sx={{
            ...dialogTitleSx,
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
                ...dialogTitleHeadSx,
                ...titleHeadSx,
              }}
            >
              <p>{title}</p>
              {TitleEl}
            </Grid>
            <Grid item sx={dialogCloseGridSx}>
              <CloseIcon onClick={handleClose} className="cursor-pointer" />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent
          sx={{
            ...dialogContentSx,
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
