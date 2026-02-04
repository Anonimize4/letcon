import jwt from 'jsonwebtoken'
import config from './env'

const jwtConfig = {
  secret: config.JWT_SECRET,
  expiresIn: config.JWT_EXPIRES_IN,
  refreshTokenExpiresIn: config.REFRESH_TOKEN_EXPIRES_IN,
}

export default jwtConfig
