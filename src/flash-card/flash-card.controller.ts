import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Delete("id")
  deleteFlashCard(@Param("id") id: string) {
    return this.flashCardService.deleteFlashCard(id);
  }

  @Get("random")
  getRandomFlashCard(@Query("project") projectId: string) {
    return this.flashCardService.getRandomFlashCard(projectId);
  }
}
