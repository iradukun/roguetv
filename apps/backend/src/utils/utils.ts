import crypto from "crypto";

export function generateRandomString(length: number) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += charset[values[i] % charset.length];
  }
  return randomString;
}
