import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './models/admin.model';
import { v4 as uuidv4 } from 'uuid';
import { LoginAdminDto } from './dto/login-admin.dto';
import { FindAdminDto } from './dto/find-admin.dto';
import { MailService } from '../mail/mail.service';
import { Op } from 'sequelize';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly AdminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    // private readonly adminModel: typeof Admin,
  ) {}

  // findAll() {
  //   return " This action returns all Admins;"
  // }

  findOne(id: number) {
    return this.AdminRepo.findByPk(id);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return 'This action updates a #${id} Admin;';
  }

  remove(id: number) {
     this.AdminRepo.destroy({ where: { id } });
     return { message: "Foydalanuvchi o'chirildi" };
  }

  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const Admin = await this.AdminRepo.findOne({
      where: { username: createAdminDto.username },
    });
    if (Admin) {
      throw new BadRequestException('Adminname already exists');
    }
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Password is not match');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.AdminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newAdmin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updateAdmin = await this.AdminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newAdmin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    await this.mailService.sendAdminConfirmation(updateAdmin[1][0]);

    const response = {
      message: 'Admin registered',
      Admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(Admin: Admin) {
    const JwtPayload = {
      id: Admin.id,
      is_active: Admin.is_active,
      is_owner: Admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(JwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(JwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const Admin = await this.AdminRepo.findOne({ where: { email } });
    if (!Admin) {
      throw new UnauthorizedException('Admin topilmadi');
    }
    const isMatchPass = await bcrypt.compare(password, Admin.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Admin not registration');
    }

    const tokens = await this.getTokens(Admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.AdminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: Admin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin registered',
      Admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const AdminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!AdminData) {
      throw new ForbiddenException('Admin not found');
    }
    const updateAdmin = await this.AdminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: AdminData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfuly',
      Admin: updateAdmin[1][0],
    };
    return response;
  }

  async refreshToken(Admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (Admin_id != decodedToken['id']) {
      throw new UnauthorizedException('Admin topilmadi');
    }
    const Admin = await this.AdminRepo.findOne({ where: { id: Admin_id } });
    if (!Admin || !Admin.hashed_refresh_token) {
      throw new UnauthorizedException('Admin not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      Admin.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(Admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.AdminRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: Admin.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin refreshed',
      Admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async findAll(findAdminDto: FindAdminDto) {
    const where = {};
    if (findAdminDto.first_name) {
      where['first_name'] = {
        [Op.like]: `%${findAdminDto.first_name}%`,
      };
    }

    if (findAdminDto.last_name) {
      where['last_name'] = {
        [Op.like]: `%${findAdminDto.last_name}%`,
      };
    }

    if (findAdminDto.username) {
      where['Adminname'] = {
        [Op.like]: `%${findAdminDto.username}%`,
      };
    }

    if (findAdminDto.phone) {
      where['phone'] = {
        [Op.like]: `%${findAdminDto.phone}%`,
      };
    }

    if (findAdminDto.email) {
      where['email'] = {
        [Op.like]: `%${findAdminDto.email}%`,
      };
    }

    // if (findAdminDto.birthday_begin && findAdminDto.birthday_end) {
    //   where[Op.and] = {
    //     [Op.between]: `%${findAdminDto.first_name}%`,
    //   };
    // } else if (findAdminDto.birthday_begin) {
    //   where['birthday'] = { [Op.gte]: findAdminDto.birthday_begin };
    // } else if (findAdminDto.birthday_end) {
    //   where['birthday'] = { [Op.lte]: findAdminDto.birthday_end };
    // }
    const Admins = await Admin.findAll({ where });
    if (!Admins) {
      throw new BadRequestException('Admin not found');
    }
    return Admins;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activate link not found');
    }
    const updateAdmin = await this.AdminRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updateAdmin[1][0]) {
      throw new BadRequestException('Admin already activated');
    }
    const response = {
      message: 'Admin activated successfuly',
      Admin: updateAdmin,
    };
    return response;
  }

  // async createAdmin(createAdminDto: CreateAdminDto) {
  //   const newAdmin = await this.adminModel.create(createAdminDto);
  //   // const role = await this.roleService.getRoleByValue('ADMIN');
  //   // if (!role) {
  //   //   throw new BadRequestException('Role not found');
  //   // }
  //   // // await newUser.$set('roles', [role.id]);
  //   // // await newUser.save();
  //   // newAdmin.roles = [role];

  //   return newAdmin;
  // }

  // async getAdminByLogin(login: string) {
  //   const admin = await this.adminModel.findOne({
  //     where: { login },
  //     include: { all: true },
  //   });
  //   return admin;
  // }
}
