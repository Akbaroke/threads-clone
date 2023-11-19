function hideEmail(email: string): string {
  const atIndex = email.indexOf('@');
  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex);
  const hiddenUsername = username.slice(0, 3) + '***';
  return hiddenUsername + domain;
}

export default hideEmail;
