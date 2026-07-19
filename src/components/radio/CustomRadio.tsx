import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

type InputProps = {
  label: string
  value: string
}

export default function CustomRadio({ label, value }: InputProps) {
  return (
    <FormControlLabel
      className="mr-8"
      value={value}
      control={<Radio sx={{ '&.Mui-checked': { color: '#EC9324' } }} />}
      label={label}
    />
  )
}
