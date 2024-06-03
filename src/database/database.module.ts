import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: "DATABASE_SERVICE",
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get("REDIS_HOST"),
            port: configService.get<number>("REDIS_PORT"),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class DatabaseModule {

}
