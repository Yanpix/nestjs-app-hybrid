import { Length } from 'class-validator';

export class TranslateDataDto {

    @Length(2, 2)
    readonly language: string;
    language_text: string;
}