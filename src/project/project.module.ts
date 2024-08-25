import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entity/project.entity";
import { FlashCard } from "src/flash-card/entity/flash-card.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Project, FlashCard])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
