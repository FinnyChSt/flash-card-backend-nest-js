import { Module } from "@nestjs/common";
import { FlashCardController } from "./flash-card.controller";
import { FlashCardService } from "./flash-card.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FlashCard } from "./entity/flash-card.entity";
import { Project } from "src/project/entity/project.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FlashCard, Project])],
  controllers: [FlashCardController],
  providers: [FlashCardService],
})
export class FlashCardModule {}
