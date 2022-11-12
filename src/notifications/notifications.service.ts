import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

type SlackChannelsResponse = {
  ok: boolean;
  channels: {
    id: string;
    name: string;
    is_channel: boolean;
  }[];
};

@Injectable()
export class NotificationsService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  private async getSlackChannels(
    skipCache?: boolean,
  ): Promise<SlackChannelsResponse> {
    const slackBotToken = this.configService.get<string>('SLACK_BOT_TOKEN');

    const cachedChannels = await this.cacheManager.get<SlackChannelsResponse>(
      'slackChannels',
    );

    if (!skipCache && cachedChannels) return cachedChannels;

    const slackChannels = await firstValueFrom(
      this.httpService.get<SlackChannelsResponse>(
        `https://slack.com/api/conversations.list`,
        {
          headers: {
            Authorization: `Bearer ${slackBotToken}`,
          },
        },
      ),
    );

    await this.cacheManager.set(
      'slackChannels',
      slackChannels.data,
      60 * 60 * 24,
    );

    return slackChannels.data;
  }

  private async createSlackChannel(channelName: string): Promise<any> {
    const slackBotToken = this.configService.get<string>('SLACK_BOT_TOKEN');

    const request = this.httpService.post(
      'https://slack.com/api/conversations.create',
      {
        name: channelName,
      },
      {
        headers: {
          Authorization: `Bearer ${slackBotToken}`,
        },
      },
    );

    const response = await firstValueFrom(request);

    return response.data;
  }

  public async createSlackChannelIfDoesntExist(
    channelName: string,
  ): Promise<void> {
    // Check if channel exists, if not create one
    const slackChannels = await this.getSlackChannels();
    const channelExists = slackChannels.channels.find(
      (ch) => ch.name === channelName,
    );

    if (!channelExists) {
      await this.createSlackChannel(channelName);
    }
  }

  // Send a slack message to the #knowledgetest-noncdl-edison channel
  public async sendSlackMessage(
    channel: string,
    message: string,
  ): Promise<void> {
    const slackBotToken = this.configService.get<string>('SLACK_BOT_TOKEN');

    // Check if channel exists, if not create one
    await this.createSlackChannelIfDoesntExist(channel);

    const request = this.httpService.post(
      'https://slack.com/api/chat.postMessage',
      {
        channel: `#${channel}`,
        text: message,
      },
      {
        headers: {
          Authorization: `Bearer ${slackBotToken}`,
        },
      },
    );

    await firstValueFrom(request);
  }
}
