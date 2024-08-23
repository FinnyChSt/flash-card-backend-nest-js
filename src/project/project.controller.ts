import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/createProject.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  //Post to create new Project takes title and description as inputs in the body
  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectService.createProject(createProjectDto);
  }

  @Get()
  async getProjects() {
    return await this.projectService.getProjects();
  }
}
