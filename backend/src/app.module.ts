import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        secure: false,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.GMAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"No_reply SQLi_demo" ${process.env.EMAIL_ADDRESS}`,
      },
      template: {
        dir: join(__dirname, '../views/email-templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
