import { Project } from "src/project/entity/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FlashCard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @ManyToOne(() => Project, (project) => project.flashCards)
  project: Project;
}
