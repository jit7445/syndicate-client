import Grid from '@mui/material/Grid'
import { HookTextField } from '../form-fields/SLFieldTextField'
import Button from '../button/Button'
import { useHookFormContext } from '../../utils/hooks/useHookFormContext'
import { validRegex } from '../../utils/isValidType'
import { commonInputStyles } from '../../common/input-styles'
import type { SupportFormValues } from './types'

export default function Fields() {
  const { registerState } = useHookFormContext<SupportFormValues>()

  return (
    <Grid container spacing={2} mt="1px">
      <HookTextField
        {...registerState('name')}
        rules={{ required: { value: true, message: 'This field is required' } }}
        textFieldProps={{ ...commonInputStyles, label: 'Your name', required: true }}
        gridProps={{ xs: 12, sm: 6 }}
      />
      <HookTextField
        {...registerState('email')}
        rules={{
          required: { value: true, message: 'This field is required' },
          pattern: { value: validRegex('email'), message: 'Please enter a correct email' },
        }}
        textFieldProps={{ ...commonInputStyles, label: 'Work email', required: true }}
        gridProps={{ xs: 12, sm: 6 }}
      />
      <HookTextField
        {...registerState('message')}
        rules={{ required: { value: true, message: 'This field is required' } }}
        textFieldProps={{
          ...commonInputStyles,
          label: 'What are you trying to find?',
          required: true,
          multiline: true,
          rows: 5,
        }}
        gridProps={{ xs: 12 }}
      />
      <Grid item xs={12}>
        <Button
          variant="contained"
          label="Send message"
          buttonType="submit"
          styles={{ width: '100%', height: '44px', fontSize: '14px' }}
        />
      </Grid>
    </Grid>
  )
}
