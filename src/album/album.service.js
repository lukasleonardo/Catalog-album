const Album = require('../model/album')
class albumService{
  getAlbums(){
    const albums = Album.find()
    return albums
  }

  getAlbumByName(name){
    const albums = Album.find({
      $or: [
      { artist: name },
      { name: name }
    ]}
  )  
    return albums
  }

  createAlbum(album){
    const newAlbum = Album.create(album)
    return newAlbum
  }

  findAlbum(name, artist){
    const album = Album.find({
      $and: [
      { artist: artist },
      { name: name }
    ]})
    return album
  }
  
  findById(id){
    const album = Album.findById(id)
    return album
  }
  
  updateAlbum(album, albumDto){
    const uptAlbum = Album.findByIdAndUpdate(album.id,albumDto)
    return uptAlbum
  }

  updateAlbum(album){
    const uptAlbum = Album.findByIdAndDelete(album.id)
    return uptAlbum
  }

}

module.exports = albumService