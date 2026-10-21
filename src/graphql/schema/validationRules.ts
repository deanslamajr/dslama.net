import { ASTVisitor, GraphQLError, ValidationContext } from 'graphql';

// The largest operation the client sends selects about 12 fields.
export const MAX_FIELDS_PER_DOCUMENT = 50;

export const maxFieldsRule = (context: ValidationContext): ASTVisitor => {
  let fields = 0;
  return {
    Field() {
      fields += 1;
      if (fields === MAX_FIELDS_PER_DOCUMENT + 1) {
        context.reportError(
          new GraphQLError(`A request may select at most ${MAX_FIELDS_PER_DOCUMENT} fields.`)
        );
      }
    },
  };
};
