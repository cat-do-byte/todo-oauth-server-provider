import { randomBytes, scryptSync, timingSafeEqual } from "crypto"

export const generateId = (size = 32) => {
  const buffer = randomBytes(size)
  return buffer.toString("base64")
}

export const generateSecret = (key: string) => {
  const salt = randomBytes(8).toString("hex")
  const buffer = scryptSync(key, salt, 64) as Buffer
  return `${buffer.toString("hex")}.${salt}`
}
