export type AuthDialogMode = 'signin' | 'register'

export type SignInFormValues = {
  workEmail: string
  password: string
}

export type RegisterFormValues = {
  fullName: string
  workEmail: string
  companyName: string
  password: string
}

export type AuthResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}
