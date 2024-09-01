import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { FlashCardService } from "./flash-card.service";
import { CreateFlashCardDto } from "./dto/creat-flash-card.dto";

@Controller("flash-card")
export class FlashCardController {
  constructor(private readonly flashCardService: FlashCardService) {}

  @Post()
  createFlashCard(@Body() createFlashCardDto: CreateFlashCardDto) {
    return this.flashCardService.createFlashCard(createFlashCardDto);
  }

  @Get()
  getFlashCardByProject(@Query("project") projectId: string) {
    if (projectId === undefined) {
      return this.flashCardService.getFlashCards();
    }
    return this.flashCardService.getFlashCardsByProject(projectId);
  }
  @Get("random")
  getRandomFlashCard(@Query("project") projectId: string) {
    return this.flashCardService.getRandomFlashCard(projectId);
  }

  @Get(":id")
  getFlashCardById(@Param("id") id: string) {
    return this.flashCardService.getFlashCardById(id);
  }

  @Delete(":id")
  deleteFlashCard(@Param("id") id: string) {
    return this.flashCardService.deleteFlashCard(id);
  }

  @Patch(":id/correct")
  updateFlashCardCorrectAnswer(@Param("id") id: string) {
    return this.flashCardService.updateFlashCardCorrectAnswer(id);
  }

  @Patch(":id/wrong")
  updateFlashCardWrongAnswer(@Param("id") id: string) {
    return this.flashCardService.updateFlashCardWrongAnswer(id);
  }
}
