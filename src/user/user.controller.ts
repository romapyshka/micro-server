import { Body, Controller, Post } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log("Creating user");
    return lastValueFrom(this.userService.createUser(createUserDto));
  }
}
