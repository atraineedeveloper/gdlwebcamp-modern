import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DbService } from '../db/db.service';
import { LoginDto, RefreshDto } from './dto';
import type { JwtPayload } from '../common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DbService,
    private readonly jwt: JwtService
  ) {}

  async login(dto: LoginDto) {
    const result = await this.db.query<{
      id_admin: number;
      usuario: string;
      password: string;
    }>('SELECT id_admin, usuario, password FROM admins WHERE usuario = $1 LIMIT 1', [dto.usuario]);

    const admin = result.rows[0];
    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const ok = await bcrypt.compare(dto.password, admin.password);
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.signTokens({ sub: admin.id_admin, usuario: admin.usuario });
  }

  async refresh(dto: RefreshDto) {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(dto.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET ?? 'change_me_refresh'
      });
      return this.signTokens({ sub: payload.sub, usuario: payload.usuario });
    } catch {
      throw new UnauthorizedException('Refresh token inválido');
    }
  }

  logout() {
    return { success: true };
  }

  private async signTokens(payload: JwtPayload) {
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET ?? 'change_me',
      expiresIn: (process.env.JWT_EXPIRES_IN ?? '15m') as any
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET ?? 'change_me_refresh',
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as any
    });

    return { accessToken, refreshToken };
  }
}
