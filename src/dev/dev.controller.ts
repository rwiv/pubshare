import { Controller, Get, Logger } from '@nestjs/common';

@Controller('dev')
export class DevController {
  private readonly logger = new Logger(DevController.name);

  @Get('hello')
  getHello(): string {
    this.logger.log('hello');
    this.logger.debug('logging');
    return 'hello world';
  }
}
