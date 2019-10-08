import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ActivateFormPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        value.date_of_birth = new Date(value.date_of_birth);
        return value;
    }
}