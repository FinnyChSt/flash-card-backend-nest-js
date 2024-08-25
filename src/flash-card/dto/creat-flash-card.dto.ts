import { IsNotEmpty } from "class-validator";

export class CreateFlashCardDto {
  @IsNotEmpty()
  question: string;
  @IsNotEmpty()
  answer: string;
  @IsNotEmpty()
  projectId: string;
}
