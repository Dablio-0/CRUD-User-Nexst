import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'ID do usuário' })
  @Expose()
  id: number;

  @ApiProperty({ description: 'Email do usuário' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'Nome do usuário' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'URL do avatar' })
  @Expose()
  avatar?: string;

  @ApiProperty({ description: 'Status ativo do usuário' })
  @Expose()
  isActive: boolean;

  @ApiProperty({ description: 'Data de criação' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  @Expose()
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}