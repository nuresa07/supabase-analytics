import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Axios } from 'axios';


@Injectable()
export class SupabaseAuthGuard implements CanActivate {

  private axios = new Axios({
    baseURL: process.env.SUPABASE_URL + '/auth/v1',
    headers: {
      apiKey: process.env.SUPABASE_ANON_KEY || ''
    }
  })

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException('Authorization header tidak valid atau tidak ditemukan');
    }

    const token = authHeader.split(" ")[1]?.trim();

    if (!token || token.length < 20) {
      // bisa juga pakai regex validasi JWT format kalau mau ketat
      throw new UnauthorizedException('Token tidak valid');
    }

    try {
      const { data } = await this.axios.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // ✅ Tambahkan pengecekan jika data mengandung error
      if (typeof data === 'string') {
        const parsed = JSON.parse(data)

        if (parsed?.error_code === "bad_jwt") {
          console.error("❌ Supabase token error:", parsed.msg);
          throw new UnauthorizedException("Token tidak valid atau expired");
        }

        request.user = parsed
      } else {
        throw new UnauthorizedException("Data user tidak valid");
      }

      return true

    } catch (error) {
      console.error('SUPABASE ERROR:', error?.response?.data || error?.message);
      throw new UnauthorizedException('Token tidak valid')
    }
  }

}