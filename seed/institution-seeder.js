import Institution from '../models/institution'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/carecenter', { useNewUrlParser: true });

var institutions = [
  new Institution({
    institutionId: '7335010026',
    institutionName: '大川醫院附設護理之家',
    licenseBedCount: 142,
    openBedCount: 142
  }),
  new Institution({
    institutionId: '7335010044',
    institutionName: '大千醫療社團法人附設南勢護理之家',
    licenseBedCount: 120,
    openBedCount: 55
  }),
  new Institution({
    institutionId: '7335020531',
    institutionName: '李綜合醫療社團法人附設中華護理之家',
    licenseBedCount: 75,
    openBedCount: 75
  }),
  new Institution({
    institutionId: '7435010617',
    institutionName: '弘愛護理之家',
    licenseBedCount: 90,
    openBedCount: 90
  }),
  new Institution({
    institutionId: '7435040044',
    institutionName: '慈祐醫院附設護理之家',
    licenseBedCount: 45,
    openBedCount: 45
  })
];

var done = 0;
for (var i = 0; i < institutions.length; i++) {
  institutions[i].save(function (err, result) {
    done++;
    if (done === institutions.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}









