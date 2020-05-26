import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField, GraphQLError } from 'graphql';
import { MyContext } from 'src/app.module';
import { HttpException } from '@nestjs/common';

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      console.log(args[2].user);
      console.log(args[2].role);
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return null;
    };
  }
}
