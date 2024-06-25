import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import {DatabaseService} from "../database/database.service";

@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(private jwtService: JwtService,
              private prisma: DatabaseService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const authHeader = req.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]
      if (bearer !== 'Bearer' || !token){
        throw new UnauthorizedException({message: 'User is not authorized'})
      }

      const decodedToken = this.jwtService.verify(token) as { id: number };

      const user = await this.prisma.user.findUnique({
        where: {
          id: decodedToken.id,
        },
      });

      if (!user) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      req.user = user
      return true

    } catch (e) {
      throw new UnauthorizedException({message: 'User is not authorized'})
    }
  }
}