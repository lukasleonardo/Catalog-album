const router = require('express').Router()
const { existsException, notFoundException } = require('../utils/httpError')
const albumService = require('./album.service')

//get all
router.get('/',async (req,res)=>{
  const albums = await albumService.getAlbums()
  if(albums.lenght == 0){res.send('No albums found')}
  res.send(albums)
})
//getbyname
router.get('/:name',async (req,res)=>{
  const albumName = req.params.name
  const albums = await albumService.getAlbumsByName(albumName)
  if(albums.lenght == 0){res.send('No albums found')}
  res.send(albums)
})

//create
router.post('/',async (req,res)=>{
  
  const albumDto = {
    name:req.body.name,
    artist:req.body.artist, 
    songs:{title:req.body.title,genre:req.body.genre,duration:req.body.duration},
    year:req.body.year,
    createdBy:req.session
  }
  const exists = await albumService.findAlbum(albumDto.name, albumDto.artist)
  if(exists){
    const erro = new existsException('Item already exists')
    res.status(erro.code).send(erro.message)
  }
  const album = await albumService.createAlbum(albumDto)
  res.send(album)
})

// update
router.put('/:id', async (req,res)=>{
  const albumId= req.params.id
  const albumDto = {
    name:req.body.name,
    artist:req.body.artist, 
    songs:{title:req.body.title,genre:req.body.genre,duration:req.body.duration},
    year:req.body.year,
  }
  const album = albumService.findById(albumId)

  if(!album){
    const erro = new notFoundException('No album found!')
    res.status(erro.code).send(erro.message)
  }

  res.send(await albumService.updateAlbum(album.id,albumDto))
});
// delete
router.delete('/:id', async (req,res)=>{
  const albumId= req.params.id
  const albumDto = {
    name:req.body.name,
    artist:req.body.artist, 
    songs:{title:req.body.title,genre:req.body.genre,duration:req.body.duration},
    year:req.body.year,
  }
  const album = albumService.findById(albumId)
  if(!album){
    const erro = new notFoundException('No album found!')
    res.status(erro.code).send(erro.message)
  }
  res.send(await albumService.deleteUser(albumDto))
});

module.exports = router