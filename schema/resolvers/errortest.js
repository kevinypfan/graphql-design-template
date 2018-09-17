import { ApolloError, ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server'

export default {
  Query: {
    authenticationError: (parent, args, context) => {
      throw new AuthenticationError('must authenticate');
    },
    forbiddenError: (parent, args, context) => {
      throw new ForbiddenError("You must be an administrator to see all todos");
    },
    apolloError: (parent, args, context) => {
      throw new ApolloError('The id is already taken', 'DUPLICATE_KEY', { field: 'id' });
    },
    normalError: (parent, args, context) => {
      throw new Error('This is normal error');
    },
  },
  Mutation: {
    userInputError: (parent, args, context, info) => {
      if (args.input !== 'expected') {
        throw new UserInputError('Form Arguments invalid', {
          invalidArgs: Object.keys(args),
        });
      }
    },
  },
}