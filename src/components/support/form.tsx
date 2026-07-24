import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../common/defaultFormTheme";
import Fields from "./fields";
import type { SupportFormValues } from "./types";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import { RequestServer } from "../../utils/services";

type SupportFormProps = {
  handleSubmitClose: () => void;
};

const defaultValues: SupportFormValues = {
  name: "",
  email: "",
  message: "",
};

export default function SupportForm({ handleSubmitClose }: SupportFormProps) {
  const methods = useForm<SupportFormValues>({ defaultValues });
  const defaultTheme = createTheme(defaultFormTheme);

  const onSubmit = async (data: SupportFormValues) => {
    await RequestServer(API_ENDPOINTS.support, "POST", data);
    methods.reset();
    handleSubmitClose();
  };

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
}
