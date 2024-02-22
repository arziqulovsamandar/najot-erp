import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { Employee1Service } from '../employee/employee.service';
import { CreateEmployeeDto } from '../employee/dto/create-employee.dto';
import { Employee1 } from '../employee/models/employee.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: Employee1Service,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user);
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getEmployee1ByLogin(loginDto.login);
    if (!user) {
      throw new UnauthorizedException("Email yoki Parol nato'g'ri");
    }
    const validPassword = await bcrypt.compare(
      loginDto.hashed_password,
      user.hashed_password,
    );
    if (validPassword) {
      return user;
    }
    throw new UnauthorizedException("Email yoki Parol nato'g'ri");
  }

  async registration(userDto: CreateEmployeeDto) {
    const condidate = await this.userService.getEmployee1ByLogin(userDto.login);
    if (condidate) {
      throw new HttpException(
        'bundat foydalanuvchi mavjud',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.hashed_password, 7);
    const user = await this.userService.createEmployee1({
      ...userDto,
      hashed_password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(admin: Employee1) {
    const payload = { Login: admin.login, id: admin.id };
    return { token: this.jwtService.sign(payload) };
  }

  // async create(createEmployee1Dto: CreateEmployeeDto) {
  //   return this..create(createEmployee1Dto);
  // }
}
