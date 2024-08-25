import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectModule } from "./project/project.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./project/entity/project.entity";
import { FlashCardModule } from "./flash-card/flash-card.module";
import { FlashCard } from "./flash-card/entity/flash-card.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "flash-card",
      entities: [Project, FlashCard],
      synchronize: true,
    }),
    ProjectModule,
    FlashCardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
