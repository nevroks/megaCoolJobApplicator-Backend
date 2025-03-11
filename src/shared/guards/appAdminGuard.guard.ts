import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppAdminGuard implements CanActivate {
    private handleUnauthorizedRequest() {
        throw new UnauthorizedException("Нахуй пошёл чурка");
    }
    constructor(private configService: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requestedPassword = request.headers['x-app-admin-password'];
        if (!requestedPassword) {
            this.handleUnauthorizedRequest();
        }
        const expectedPassword = this.configService.get<string>('APP_ADMIN_PASSWORD');

        if (requestedPassword !== expectedPassword) {
            this.handleUnauthorizedRequest();
            return false
        } else {
            return true
        }

    }
}