import Institution from '../../models/institution'

import { pubsub } from '../lib/pubsub'


export default {
  Query: {
    getInstitutionById: (root, { id }) => Institution.findById(id),
    getInstitutionList: () => Institution.find(),
  },
  Mutation: {
    newInstitution: (root, args, context) => {
      const institution = new Institution(args);
      pubsub.publish('newInstitution', { newInstitution: { message: "new institution added!", changedData: institution } });
      return institution.save();
    },
    delInstitutionById: async (root, { id }, context) => Institution.findByIdAndDelete(id),
    updateInstitutionById: async (root, args, context) => {
      const id = args.id;
      delete args.id;
      return Institution.findByIdAndUpdate(id, { $set: args }, { new: true });
    },
  }
}