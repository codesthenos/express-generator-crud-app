import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secret.js'
import { EXPIRATION_COOKIE_TIME } from '../config.js'

const createAccessToken = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      EXPIRATION_COOKIE_TIME,
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      })
  })
}
export default createAccessToken
