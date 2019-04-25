const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const SnapAuthSchema = Schema({
  snapid: {
    type: String,
    default: null
  },
  snaprefresh: {
    type: String,
    default: null
  },
  snaptoken: {
    type: String,
    default: null
  },
  dsid: {
    type: String,
    default: shortId.generate
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'snaps' 
});


class Snap {
  
  static async createSnap(data) {
    try{
      let exists = await this.findOne({snapid: data.snapid});
      if(Boolean(exists)){
         await this.findOneAndUpdate(
          {
            _id : exists._id
          },
          data,
          {new: true})
          .exec()
        return exists.dsid;
      } else {
        let me = await this.create(data);
        return me.dsid;
      }
    } catch (err){
     return err; 
    }
  }

  static async getRecordBy(dsid) {
    console.log(dsid);
    try {
      return await this.findOne({dsid: dsid}).exec();
    } catch (err){
     return err; 
    }
  }

}

SnapAuthSchema.loadClass(Snap);

module.exports = mongoose.model('Snap', SnapAuthSchema);