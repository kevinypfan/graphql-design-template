import { pubsub } from '../lib/pubsub'

export default {
  Mutation: {
    singleUpload: (root, { file }, { processUpload }) => {
      const uploadData = processUpload(file)
      pubsub.publish('newUploadFile', { newUploadFile: { message: "new uploaded!", changedData: uploadData } });
      return uploadData
    }
  }
}

