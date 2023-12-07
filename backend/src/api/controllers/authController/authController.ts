import { NextFunction, Request, Response } from "express";

import AuthService from "../../../services/authService";

import { IVendor } from "../../../models/Vendor/vendor";
import { IPropertyManager } from "../../../models/propertyManager";
import UserFactory from "../../../services/user/userFactory";
import UserService from "../../../services/user/userService";
import { Errors } from "../../../types";
import { ServerError } from "../../middleware/errors";
import {
  CheckEmailRequest,
  CheckEmailResponse,
  GoogleAuthRequest,
  GoogleAuthResponse,
  SignInRequest,
  SignUpRequest,
  SignUpResponse,
} from "./types";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { userDto }: SignUpRequest = req.body as SignUpRequest;

      // Salt Password
      const saltedPassword = await AuthService.saltPassword(userDto.password!);
      const dtoWSalt = { ...userDto, password: saltedPassword };

      const userExists = await UserService.getByEmail(dtoWSalt.email!);
      if (userExists) {
        throw new ServerError(Errors.EMAIl_EXISTS, 400);
      }

      // Create User
      let user: IVendor | IPropertyManager = await UserFactory.create(dtoWSalt);

      // Get org id if it exists
      const orgId = UserService.getOrgId(user);

      // Create Token
      const token = AuthService.createAccessToken(user.id, user.role, orgId);

      // Create and set refresh token
      AuthService.createAndSetRefreshToken(token, res);

      const result: SignUpResponse = { token };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const signInReq: SignInRequest = req.body as SignInRequest;

      // Check if user exists
      const user = await UserService.getByEmail(signInReq.email);
      if (!user) {
        throw new ServerError(Errors.USER_NOT_FOUND, 401);
      }

      // Check if password is correct
      const passwordMatch = await AuthService.comparePasswords(
        signInReq.password,
        user.password ? user.password : ""
      );

      if (!passwordMatch) {
        throw new ServerError(Errors.INVALID_CRED, 401);
      }

      // Get org id if it exists
      const orgId = UserService.getOrgId(user);

      // Create Token
      const token = AuthService.createAccessToken(user.id, user.role, orgId);
      AuthService.createAndSetRefreshToken(token, res);

      // Send token
      const result: SignUpResponse = { token };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async signout(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.cookies.refreshToken) {
        throw new ServerError(Errors.INVALID_REFRESH_TOKEN, 418);
      }

      // delete cookie
      res.clearCookie("refreshToken");

      res.status(200);
    } catch (e) {
      next(e);
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { googleCredential, userDto } = req.body as GoogleAuthRequest;
      const isSignUp = req.query.signUp === "true";

      // Verify Google Credential
      const payload = await AuthService.verifyGoogleCredential(
        googleCredential
      );

      // Check if user exists
      let user = await UserService.getByEmail(payload.email!);
      if (!user && isSignUp) {
        // Create User
        const dto = { ...userDto!, email: payload.email };
        user = await UserFactory.create({
          ...dto,
          email: payload.email!,
        });
      } else if (!user) {
        const result: GoogleAuthResponse = { userExists: false };
        return res.status(200).json(result);
      }

      // Create Token
      const token = AuthService.createAccessToken(user!.id, user!.role);
      AuthService.createAndSetRefreshToken(token, res);

      const result: GoogleAuthResponse = { token };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.cookies.refreshToken) {
        throw new ServerError(Errors.INVALID_REFRESH_TOKEN, 418);
      }

      // create new access token
      const token = AuthService.refresh(req.cookies.refreshToken);

      // renew refresh token
      AuthService.createAndSetRefreshToken(token, res);

      const result = { token };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async checkEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email }: CheckEmailRequest = req.body;

      const user = await UserService.getByEmail(email);
      const result: CheckEmailResponse = { emailExists: !!user };
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export default AuthController;
