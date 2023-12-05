import bcrypt from "bcrypt";
import { Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt, { Secret } from "jsonwebtoken";
import { ServerError } from "../api/middleware/errors";
import { Errors, Role, TokenPayload } from "../types";

const PRIVATE_KEY: Secret = (process.env.JWT_PRIVATE_KEY as string).replace(
  /\\n/g,
  "\n"
);

const ACCESS_TOKEN_EXP = "20m";
const REFRESH_TOKEN_EXP = "7d";

const AuthService = {
  async saltPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  },

  createAccessToken(id: string, role: Role, organization?: string) {
    const tokenPayload: TokenPayload = {
      id,
      role,
      organization,
    };

    const token = jwt.sign(tokenPayload, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: ACCESS_TOKEN_EXP,
    });

    return token;
  },

  createAndSetRefreshToken(accessToken: string, res: Response): void {
    try {
      const { iat, exp, ...payload } = jwt.verify(
        accessToken,
        PRIVATE_KEY
      ) as TokenPayload;

      const refreshToken = jwt.sign(payload, PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn: REFRESH_TOKEN_EXP,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: !!process.env.PRODUCTION,
        sameSite: "strict",
      });
    } catch (e) {
      throw new ServerError(Errors.INVALID_REFRESH_TOKEN, 401);
    }
  },

  refresh(refreshToken: string): string {
    const { iat, exp, ...payload } = jwt.verify(
      refreshToken,
      PRIVATE_KEY
    ) as TokenPayload;

    const token = jwt.sign(payload, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: ACCESS_TOKEN_EXP,
    });

    return token;
  },

  async verifyGoogleCredential(googleCredential: string) {
    const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: googleCredential,
      audience: process.env.OAUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      throw new ServerError(Errors.INVALID_CRED, 401);
    }

    return payload;
  },

  comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  },
};

export default AuthService;
