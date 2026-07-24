import IconButton from "@mui/material/IconButton";
import Tooltip from "../../../../components/tooltip/Tooltip";
import DialogModal from "../../../../components/dialog/DialogModal";
import InfoOutlined from "../../../../icons/InfoOutlined/InfoOutlined";
import RequestTopicForm from "./form";

type RequestTopicDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleFormChange: () => void;
  handleSubmitClose: () => void;
};

export default function RequestTopicDialog({
  isOpen,
  handleClose,
  handleFormChange,
  handleSubmitClose,
}: RequestTopicDialogProps) {
  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={
        <span className="flex items-center gap-1">
          Request a topic
          <Tooltip
            title="Don't see the topic you need? Request it and we'll try to get it covered."
            arrow
            placement="bottom"
          >
            <IconButton size="small" sx={{ color: "inherit", p: 0.5 }}>
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </span>
      }
      dialogSx={{
        "& .MuiDialog-paper": {
          maxWidth: "560px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        },
      }}
      contentSx={{
        padding: "1.25rem 1.5rem",
      }}
    >
      <RequestTopicForm
        handleClose={handleClose}
        handleFormChange={handleFormChange}
        handleSubmitClose={handleSubmitClose}
      />
    </DialogModal>
  );
}
