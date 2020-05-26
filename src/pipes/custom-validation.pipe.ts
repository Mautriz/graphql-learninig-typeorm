import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe
  implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value =>', value, 'metadata =>', metadata);
    return super.transform(value, metadata);
  }
}
