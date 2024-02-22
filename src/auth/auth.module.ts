import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [
    forwardRef(() =>EmployeeModule),
    JwtModule.register({
      secret: 'MyVeryVerySECRETKey',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
