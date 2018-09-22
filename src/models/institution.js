/*********************************** 
create mongoose shema and export model
************************************/

import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  institutionId: {
    type: String,
    required: true
  },
  institutionName: {
    type: String,
    required: true
  },
  licenseBedCount: {
    type: Number,
    required: true
  },
  openBedCount: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Institution', schema);