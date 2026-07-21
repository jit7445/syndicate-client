import DialogModal from "../../../../components/dialog/DialogModal";
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
      title="Request a topic"
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
