import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../common/defaultFormTheme";
import Fields from "./fields";
import type { SupportFormValues } from "./types";
// TODO: uncomment once the backend exists (see onSubmit below).
// import { API_ENDPOINTS } from "../../constants/apiEndpoints";
// import { RequestServer } from "../../utils/services";

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
    // TODO: replace with a real API call once the backend exists. Request
    // body is SupportFormValues (see ./types) -> 202 Accepted (fire-and-
    // forget lead capture — wire to email/CRM webhook). To activate:
    // uncomment the imports above, uncomment the line below, delete the
    // console.log beneath it.
    //
    // await RequestServer(API_ENDPOINTS.support, "POST", data);
    console.log("Support request:", data);
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
