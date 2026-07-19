export function validRegex(option: 'email'): RegExp {
  if (option === 'email') {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/
  }

  return /0/
}
