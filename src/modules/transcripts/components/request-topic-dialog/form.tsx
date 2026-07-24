import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../common/defaultFormTheme";
import Fields from "./fields";
import type { RequestTopicFormValues } from "./types";
import { API_ENDPOINTS } from "../../../../constants/apiEndpoints";
import { RequestServer } from "../../../../utils/services";

type RequestTopicFormProps = {
  handleClose: () => void;
  handleFormChange: () => void;
  handleSubmitClose: () => void;
};

const defaultValues: RequestTopicFormValues = {
  domain: "",
  topic: "",
  email: "",
  remark: "",
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
    await RequestServer(API_ENDPOINTS.topicsRequest, "POST", data);
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
