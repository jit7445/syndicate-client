import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../common/defaultFormTheme";
import Fields from "./fields";
import type { SupportFormValues } from "./types";

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

  const onSubmit = (data: SupportFormValues) => {
    // TODO: replace with a real API call.
    // POST /api/support
    // Request body: { name: string, email: string, message: string }
    // Response: 202 Accepted (fire-and-forget lead capture — wire to email/CRM webhook)
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
