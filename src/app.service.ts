import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('NOTIFICATION_SERVICE') private redisClient: ClientProxy) {}
  createUser(): Observable<number> {
    const username = 'Mahmet';
    return this.redisClient.send('notification', username);
  }
}