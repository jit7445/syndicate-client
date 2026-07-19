import Grid from '@mui/material/Grid'
import { HookTextField } from '../../../../components/form-fields/SLFieldTextField'
import FormCancelSubmitBtns from '../../../../components/form-cancel-submit-btns/FormCancelSubmitBtns'
import { useHookFormContext } from '../../../../utils/hooks/useHookFormContext'
import { validRegex } from '../../../../utils/isValidType'
import { commonInputStyles } from '../../../../common/input-styles'
import type { SignInFormValues } from '../../types'

type SignInFieldsProps = {
  handleClose: () => void
  onSwitchToRegister: () => void
}

export default function SignInFields({ handleClose, onSwitchToRegister }: SignInFieldsProps) {
  const { registerState } = useHookFormContext<SignInFormValues>()

  return (
    <Grid container spacing={2} mt="1px">
      <HookTextField
        {...registerState('workEmail')}
        rules={{
          required: { value: true, message: 'This field is required' },
          pattern: { value: validRegex('email'), message: 'Please enter a correct email' },
        }}
        textFieldProps={{ ...commonInputStyles, label: 'Email', required: true }}
        gridProps={{ xs: 12 }}
      />
      <HookTextField
        {...registerState('password')}
        rules={{ required: { value: true, message: 'This field is required' } }}
        textFieldProps={{ ...commonInputStyles, label: 'Password', required: true, type: 'password' }}
        gridProps={{ xs: 12 }}
      />

      <Grid item xs={12}>
        <button type="button" onClick={onSwitchToRegister} className="text-sm text-accent-2 underline">
          Don't have an account? Register
        </button>
      </Grid>

      <FormCancelSubmitBtns handleClose={handleClose} submitLabel="Sign in" />
    </Grid>
  )
}
