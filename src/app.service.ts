import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome() {
    return { message: 'serving mvc home message' };
  }
}
