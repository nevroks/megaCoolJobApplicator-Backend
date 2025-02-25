import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenPresenceMiddleware implements NestMiddleware {
    use(req: Request, _res: Response, next: NextFunction) {
        const token = this.extractTokenFromHeader(req);

        if (!token) {
          throw new UnauthorizedException('Token is missing');
        }
        req['token'] = token;
        next();
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [_type, token] = request.headers.authorization?.split(' ') ?? [];

        return Boolean(token) ? token : undefined;
    }
}