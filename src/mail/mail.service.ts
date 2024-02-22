import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}



  async sendAdminConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcme to stadium app!Confirm your Email',
      template: './confirmation',
      context: {
        name: admin.first_name,
        url,
      },
    });
  }
}
