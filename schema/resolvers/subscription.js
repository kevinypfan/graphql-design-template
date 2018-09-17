import GraphQLJSON from 'graphql-type-json';
import { pubsub } from '../lib/pubsub'

export default {
  JSON: GraphQLJSON,
  Subscription: {
    newInstitution: {
      subscribe: () => {
        return pubsub.asyncIterator('newInstitution')
      },
    },
    newUploadFile: {
      subscribe: () => {
        return pubsub.asyncIterator('newUploadFile')
      },
    }
  },
}