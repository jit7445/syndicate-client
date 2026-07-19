import Grid from "@mui/material/Grid"
import { HookTextField } from "../../../../components/form-fields/SLFieldTextField"
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext"
import { commonInputStyles } from "../../../../common/input-styles"
import { CARD_NUMBER_PATTERN, CVC_PATTERN, EXPIRY_PATTERN } from "../../constants"
import type { PaymentFormValues } from "../../types"

export default function Fields() {
  const { registerState } = useHookFormContext<PaymentFormValues>()

  return (
    <Grid container spacing={2} mt="1px">
      <HookTextField
        {...registerState("cardholderName")}
        rules={{ required: { value: true, message: "This field is required" } }}
        textFieldProps={{ ...commonInputStyles, label: "Cardholder name", required: true }}
        gridProps={{ xs: 12 }}
      />
      <HookTextField
        {...registerState("cardNumber")}
        rules={{
          required: { value: true, message: "This field is required" },
          pattern: { value: CARD_NUMBER_PATTERN, message: "Format: 1234 5678 9012 3456" },
        }}
        textFieldProps={{ ...commonInputStyles, label: "Card number", required: true, placeholder: "1234 5678 9012 3456" }}
        gridProps={{ xs: 12 }}
      />
      <HookTextField
        {...registerState("expiry")}
        rules={{
          required: { value: true, message: "This field is required" },
          pattern: { value: EXPIRY_PATTERN, message: "Format: MM/YY" },
        }}
        textFieldProps={{ ...commonInputStyles, label: "Expiry", required: true, placeholder: "MM/YY" }}
        gridProps={{ xs: 6 }}
      />
      <HookTextField
        {...registerState("cvc")}
        rules={{
          required: { value: true, message: "This field is required" },
          pattern: { value: CVC_PATTERN, message: "3 or 4 digits" },
        }}
        textFieldProps={{ ...commonInputStyles, label: "CVC", required: true }}
        gridProps={{ xs: 6 }}
      />
    </Grid>
  )
}
