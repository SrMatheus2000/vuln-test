function email (em) {
  if (!em.match(/^.+@.+\..+$/)) {
    return new Error(requirements.email.valid)
  }

  return null
}