import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "../database/database.module";
import { NotificationModule } from "../notification/notification.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    NotificationModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}
