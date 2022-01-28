import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

interface JwtPayload {
  userId: number;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "ash_jwt",
    });
  }

  async validate(payload: JwtPayload) {
    console.log(payload);
    const user = await this.authService.validateUser(payload.username);
    if (!user) {
      return null;
    }
    return {
      userId: user.userId,
      username: user.username,
    };
  }
}
