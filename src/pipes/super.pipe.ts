import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class SuperPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value =>', value, 'metadata =>', metadata);
    return value;
  }
}
