import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FlashCard } from "./entity/flash-card.entity";
import { getConnection, Repository } from "typeorm";
import { CreateFlashCardDto } from "./dto/creat-flash-card.dto";
import { Project } from "src/project/entity/project.entity";

@Injectable()
export class FlashCardService {
  constructor(
    @InjectRepository(FlashCard)
    private readonly flashCardRepository: Repository<FlashCard>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async createFlashCard(createFlashCardDto: CreateFlashCardDto) {
    // return this.flashCardRepository.save(createFlashCardDto);
    const project = await this.projectRepository.findOne({
      where: { id: createFlashCardDto.projectId },
    });
    const newFlashcard = await this.flashCardRepository.create({
      ...createFlashCardDto,
      project,
    });
    await this.flashCardRepository.save(newFlashcard);
    return newFlashcard;
  }

  async getFlashCardsByProject(projectId: string) {
    return this.flashCardRepository.find({
      where: { project: { id: projectId } },
    });
  }

  async getFlashCards() {
    return this.flashCardRepository.find();
  }

  async deleteFlashCard(id: string) {
    return this.flashCardRepository.delete(id);
  }

  async getRandomFlashCard(projectId: string) {
    const flashCards = await this.flashCardRepository.find({
      where: { project: { id: projectId } },
    });
    return flashCards[Math.floor(Math.random() * flashCards.length)];
  }
}
