import { Module, OnModuleInit } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  onModuleInit() {
    const slackBotToken = this.configService.get<string>('SLACK_BOT_TOKEN');
    if (slackBotToken === undefined) {
      throw new Error(
        'SLACK_BOT_TOKEN is required, please set it in .env file',
      );
    }
  }
}
