import { Injectable, NotFoundException } from "@nestjs/common";
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

  private async getProjectById(id: string) {
    const project = await this.projectRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async createFlashCard(createFlashCardDto: CreateFlashCardDto) {
    const project = await this.getProjectById(createFlashCardDto.projectId);
    const newFlashcard = await this.flashCardRepository.create({
      ...createFlashCardDto,
      project,
    });
    await this.flashCardRepository.save(newFlashcard);
    return newFlashcard;
  }

  async getFlashCardsByProject(projectId: string) {
    await this.getProjectById(projectId);
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
    let flashCards = [];
    if (projectId === undefined) {
      flashCards = await this.flashCardRepository.find();
    } else {
      await this.getProjectById(projectId);
      flashCards = await this.flashCardRepository.find({
        where: { project: { id: projectId } },
      });
    }
    return flashCards[Math.floor(Math.random() * flashCards.length)];
  }

  async getFlashCardById(id: string) {
    const flashCard = await this.flashCardRepository.findOneBy({ id });
    if (!flashCard) {
      throw new NotFoundException(`Flash card with id ${id} not found`);
    }
    return flashCard;
  }

  async updateFlashCardCorrectAnswer(id: string) {
    const flashCard = await this.getFlashCardById(id);
    flashCard.correct += 1;
    await this.flashCardRepository.save(flashCard);
    return flashCard;
  }

  async updateFlashCardWrongAnswer(id: string) {
    const flashCard = await this.getFlashCardById(id);
    flashCard.wrong += 1;
    await this.flashCardRepository.save(flashCard);
    return flashCard;
  }
}
