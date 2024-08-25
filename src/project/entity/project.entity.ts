import { FlashCard } from "src/flash-card/entity/flash-card.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => FlashCard, (flashCard) => flashCard.project)
  flashCards: FlashCard[];
}
