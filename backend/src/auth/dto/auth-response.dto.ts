import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class AuthResponseDto {
  @ApiProperty({ description: 'Token de acesso JWT' })
  access_token: string;

  @ApiProperty({ description: 'Dados do usuário' })
  user: UserResponseDto;

  constructor(access_token: string, user: UserResponseDto) {
    this.access_token = access_token;
    this.user = user;
  }
}