const router = require('express').Router()
const connection = require('../database/database')
const albumService = require('./album.service')

//get all
router.get('/',async (req,res)=>{
  const albums = await albumService.getAlbums()
  res.send(albums)
})
//getbyUsername
router.get('/:username',async (req,res)=>{
  const user = await albumService.getAlbum(req.params.username)
  res.send(user)
})
//create
router.post('/',async (req,res)=>{
  res.send(await albumService.createUser(req.body))
})

// update
router.put('/:id', async (req,res)=>{
  res.send(await albumService.updateUser(req.params.id))
});
// delete
router.delete('/:id', async (req,res)=>{
  res.send(await albumService.deleteUser(req.params.id))
});

module.exports = router