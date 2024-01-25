const {Schema, model, models, Types} = require('mongoose')

const AlbumSchema = new Schema({
  name:{
    type:String,
    required:[true,'Album name is required']
  },
  artist:{
    type:String,
    required:[true,'Artist name is required']
  },
  songs:[
    {titulo:
      {
      type:String,
      required:[true,'Name of the song is required']
    },
    genre:{type:String},
    duration:{
      type:String
    }}
  ],
  year:{
    type:String
  },
  createdBy:{
    type:Types.ObjectId,
    ref:'User'    
  }
})

const Album = models.Album || model('Album', AlbumSchema)
module.exports = Album