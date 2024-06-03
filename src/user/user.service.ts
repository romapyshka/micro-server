import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class UserService {
  constructor(
    @Inject("NOTIFICATION_SERVICE") private notificationService: ClientProxy,
    @Inject("DATABASE_SERVICE") private databaseService: ClientProxy,
  ) {
  }

  createUser(createUserDto) {
    const notification$ = this.notificationService.send("notification", createUserDto.username);
    console.log("Notification added to schedule");
    const user$ = this.databaseService.send("createUser", createUserDto);
    console.log("User added to database");
    return forkJoin([notification$, user$]).pipe(
      map(([notification, user]) => ({
        message: notification,
        user: user,
      })),
    );
  }

}
