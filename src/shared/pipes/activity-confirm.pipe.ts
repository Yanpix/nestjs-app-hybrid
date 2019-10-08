import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ActivityConfirmPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        value.start_confirmed = parseInt(value.start_confirmed);
        value.end_confirmed = parseInt(value.end_confirmed);
        return value;
    }
}