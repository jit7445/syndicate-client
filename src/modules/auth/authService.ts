import type { AuthResponse, RegisterFormValues, SignInFormValues } from './types'

const createMockToken = (payload: { user_id: string; user_name: string; email: string }): string => {
  const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload))
  return `${header}.${body}.`
}

// TODO: swap for RequestServer(API_ENDPOINTS.login/register, 'POST', payload) once the backend exists
export const signIn = async (data: SignInFormValues): Promise<AuthResponse> => {
  const user = { id: '1', name: data.workEmail.split('@')[0], email: data.workEmail }
  return Promise.resolve({
    token: createMockToken({ user_id: user.id, user_name: user.name, email: user.email }),
    user,
  })
}

export const register = async (data: RegisterFormValues): Promise<AuthResponse> => {
  const user = { id: '1', name: data.fullName, email: data.workEmail }
  return Promise.resolve({
    token: createMockToken({ user_id: user.id, user_name: user.name, email: user.email }),
    user,
  })
}
