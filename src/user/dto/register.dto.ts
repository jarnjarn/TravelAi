// user-login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsNotEmpty } from 'class-validator';
import { UserRole } from '../enums/userRole.enum';

export class UserRegisterDto {
  @ApiProperty({ example: '0392804147' })
  @IsNotEmpty()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @ApiProperty({ example: 'NGUYỄN XUÂN GIẢNG' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
