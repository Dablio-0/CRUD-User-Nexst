import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'crud_user_nesxt',
  entities: [User],
  synchronize: process.env.NODE_ENV !== 'production', // Apenas para desenvolvimento
  logging: process.env.NODE_ENV === 'development',
  charset: 'utf8mb4',
  timezone: 'Z',
};