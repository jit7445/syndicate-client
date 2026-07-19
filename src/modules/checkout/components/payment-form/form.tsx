import { FormProvider, useForm } from "react-hook-form"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { defaultFormTheme } from "../../../../common/defaultFormTheme"
import Button from "../../../../components/button/Button"
import Fields from "./fields"
import { DEFAULT_PAYMENT_FORM_VALUES } from "../../constants"
import type { PaymentFormValues } from "../../types"

type PaymentFormProps = {
  isSubmitting: boolean
  onSubmit: (data: PaymentFormValues) => void
}

export default function PaymentForm({ isSubmitting, onSubmit }: PaymentFormProps) {
  const methods = useForm<PaymentFormValues>({ defaultValues: DEFAULT_PAYMENT_FORM_VALUES })
  const defaultTheme = createTheme(defaultFormTheme)

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields />
          <div className="mt-6">
            <Button
              variant="contained"
              label="Pay"
              buttonType="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </ThemeProvider>
    </FormProvider>
  )
}
