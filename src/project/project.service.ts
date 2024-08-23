import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/createProject.dto';
import { Project } from './entity/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return await this.projectRepository.save(project);
  }

  async getProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }
}

//   async createProject(
//     createProjectDto: CreateProjectDto,
//   ): Promise<CreateProjectDto> {
//     return createProjectDto;
//   }
