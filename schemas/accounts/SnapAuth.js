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
      let me = await this.create(data);
      return me.dsid;
    } catch (err){
     return err; 
    }
  }
}

SnapAuthSchema.loadClass(Snap);

module.exports = mongoose.model('Snap', SnapAuthSchema);