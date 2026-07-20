import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../common/defaultFormTheme";
import Fields from "./fields";
import type { RequestTopicFormValues } from "./types";

type RequestTopicFormProps = {
  handleClose: () => void;
  handleFormChange: () => void;
  handleSubmitClose: () => void;
};

const defaultValues: RequestTopicFormValues = {
  domain: "",
  topic: "",
  email: "",
  suggestedExpertName: "",
  suggestedExpertLinkedin: "",
};

export default function RequestTopicForm({
  handleClose,
  handleFormChange,
  handleSubmitClose,
}: RequestTopicFormProps) {
  const methods = useForm<RequestTopicFormValues>({ defaultValues });
  const defaultTheme = createTheme(defaultFormTheme);

  const onSubmit = (data: RequestTopicFormValues) => {
    // TODO: replace with a real API call.
    // POST /api/topics/request
    // Request body: { domain: string, topic: string, email: string, suggestedExpertName: string, suggestedExpertLinkedin: string }
    // Response: 202 Accepted (fire-and-forget lead capture — wire to email/CRM webhook)
    console.log("Requested topic:", data);
    handleSubmitClose();
  };

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields
            handleClose={handleClose}
            handleFormChange={handleFormChange}
          />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
}
