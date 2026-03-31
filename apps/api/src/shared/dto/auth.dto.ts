// ============================================================
// Shared DTO: Auth (LOCKED)
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@suetogether.com', description: '이메일 주소' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'password123', description: '비밀번호' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: 'default', description: '테넌트 식별자' })
  @IsString()
  @IsNotEmpty()
  tenantSlug!: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'user@suetogether.com', description: '이메일 주소' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'password123', description: '비밀번호' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ example: '홍길동', description: '사용자 이름' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'default', description: '테넌트 식별자' })
  @IsString()
  @IsNotEmpty()
  tenantSlug!: string;
}
