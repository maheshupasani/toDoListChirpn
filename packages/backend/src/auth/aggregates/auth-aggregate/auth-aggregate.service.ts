import { Injectable, Next } from '@nestjs/common';
import { from, of } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from 'src/auth/entities/user/user-dto';
import { UserService } from 'src/auth/entities/user/user.service';
import { User } from 'src/entities/user-entity';
import * as bcrypt from 'bcrypt';
import { switchMap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';
import { TokenCache } from 'src/entities/token-cache-entity';
import {
  EXPIRY_DURATION_IN_SECONDS,
  SET_TOKEN_EXPIRED,
} from 'src/constant/app-strings';
import { TokenCacheService } from 'src/auth/entities/token-cache/token-cache.service';

@Injectable()
export class AuthAggregateService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenCacheService: TokenCacheService,
  ) {}

  registerUser(payload: RegisterUserDto) {
    const user = new User();
    return from(bcrypt.hash(payload.password, 10)).pipe(
      switchMap((hashedPassword: string) => {
        payload.password = hashedPassword;
        Object.assign(user, payload);
        user.save().then();
        return of({
          status: true,
          message: 'User has been registered successful.Please login',
        });
      }),
    );
  }

  login(payload: LoginUserDto) {
    return from(
      this.userService.findOne({
        email: payload.email,
      }),
    ).pipe(
      switchMap((user) => {
        return from(bcrypt.compare(payload.password, user.password)).pipe(
          switchMap((passwordMatched) => {
            const token = jwt.sign({ loggedInOn: new Date() }, 'To Do List');
            const tokenCache = new TokenCache();
            tokenCache.userUuid = user.uuid;
            tokenCache.expiry = (
              Date.now() / 1000 +
              Number(EXPIRY_DURATION_IN_SECONDS)
            ).toString(); // 1500 in seconds
            tokenCache.token = token;
            tokenCache.save().then();
            return of({
              token: tokenCache.token,
            });
          }),
        );
      }),
    );
  }

  logout(clientRequest) {
    return from(
      this.tokenCacheService.findOne({
        token: clientRequest.headers.authorization.split(' ')[1],
      }),
    ).pipe(
      switchMap((tokenCache) => {
        tokenCache.expiry = (
          Date.now() / 1000 -
          Number(SET_TOKEN_EXPIRED)
        ).toString();
        tokenCache.save().then();
        return of({
          loggedOut: true,
        });
      }),
    );
  }
}
