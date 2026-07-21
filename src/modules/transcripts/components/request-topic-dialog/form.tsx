import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../common/defaultFormTheme";
import Fields from "./fields";
import type { RequestTopicFormValues } from "./types";
// TODO: uncomment once the backend exists (see onSubmit below).
// import { API_ENDPOINTS } from "../../../../constants/apiEndpoints";
// import { RequestServer } from "../../../../utils/services";

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

  const onSubmit = async (data: RequestTopicFormValues) => {
    // TODO: replace with a real API call once the backend exists. Request
    // body is RequestTopicFormValues (see ./types) -> 202 Accepted
    // (fire-and-forget lead capture — wire to email/CRM webhook). To
    // activate: uncomment the imports above, uncomment the line below,
    // delete the console.log beneath it.
    //
    // await RequestServer(API_ENDPOINTS.topicsRequest, "POST", data);
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
