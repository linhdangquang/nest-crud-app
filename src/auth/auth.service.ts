import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptionCrypto } from 'src/common/encryption/encryption-crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user) {
      const compare = await EncryptionCrypto.compare(user.password, pass);

      if (compare) {
        return user;
      }
      throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }
}
