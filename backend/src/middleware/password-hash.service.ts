import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class PasswordHashService {
  async hashPassword(password: string, salt: string): Promise<string> {
    const saltRounds = 10;
    const saltedPassword = salt + password;
    return await bcrypt.hash(saltedPassword, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<any> {
    return bcrypt.compare(password, hashedPassword);
  }
}
