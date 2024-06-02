import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { forkJoin, Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationService: ClientProxy,
    @Inject('DATABASE_SERVICE') private databaseService: ClientProxy
  ) {
    console.log("UserService instance:", notificationService);
  }

  createUser(createUserDto){
    const notification = this.notificationService.send('notification', createUserDto.username);
    const user = this.databaseService.send('createUser', createUserDto);
    return forkJoin([notification, user])
  }

}
