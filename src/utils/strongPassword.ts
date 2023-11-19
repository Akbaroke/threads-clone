function validatePassword(password: string): boolean {
  const regex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\[\]{}|;':",.<>?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\[\]{}|;':",.<>?]{8,}$/;
  return regex.test(password);
}
