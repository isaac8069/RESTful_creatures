const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE -- GET INDEX (READ)
router.get('/', (req, res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        prehistoricData = prehistoricData.filter((prehistoricCreatures)=>{
            return prehistoricCreatures.name.toLowerCase() === nameFilter.toLowerCase()
       })
   }
    res.render('prehistoric_creatures/index.ejs', {prehistoricData: prehistoricData})
})

// NEW ROUTE -- GET NEW (READ)
router.get('/new', (req, res)=>{
    res.render('prehistoric_creatures/new.ejs')
})

// GET UPDATE/EDIT FORM
router.get('/edit/:idx', (req, res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    res.render('prehistoric_creatures/edit.ejs', {prehistoricCreaturesId: req.params.idx, prehistoricCreatures: prehistoricData[req.params.idx]})
})

// UPDATE A PREHISTORIC CREATURE
router.put('/:idx', (req, res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    // re-assign the name an type fields of the dino to be editted
    prehistoricData[req.params.idx].name = req.body.name
    prehistoricData[req.params.idx].type = req.body.type

    // save the editted prehistoricCreature to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    res.redirect('/prehistoric_creatures')
})

// SHOW ROUTE -- GET EDIT (READ)
router.get('/:idx', (req, res)=>{
    // get prehistoricCreatures array
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    // get array index from url parameter
    let prehistoricIndex = req.params.idx

    res.render('prehistoric_creatures/show.ejs', {myPrehistoricCreature: prehistoricData[prehistoricIndex]})
})
    // How to render images
[
    {
      "type":"giant beaver",
      "img_url":"http://www.beringia.com/sites/default/files/Giant-Beaver-banner.jpg"
    },
    {
      "type":"mastodon",
      "img_url":"https://cdn-images-1.medium.com/max/1200/1*a2VvYsKGApR-E1SnT5O7yQ.jpeg"
    },
    {
      "type":"saber-toothed salmon",
      "img_url":"https://cottagelife.com/wp-content/uploads/2014/11/Oncorhynchus_rastrosus.jpg"
    },
    {
      "type":"megalonyx",
      "img_url":"https://animalgeography.files.wordpress.com/2018/08/sloth-banner-e1535192925361.jpg?w=584&h=325"
    }
  ]

// POST A NEW PREHISTORIC CREATURE -- PUT UPDATE (UPDATE)
router.post('/', (req, res)=>{
    // get prehistoricCreatures array
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    // add new prehistoricCreature to prehistoricData
    prehistoricData.push(req.body)

    // save updated prehistoricData to json
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))

    // redirect to GET /prehistoric_creatures (index)
    res.redirect('/prehistoric_creatures')
})

// DESTROY (DELETE)
router.delete('/:idx', (req, res)=>{
    // get prehistoricCreatures array
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    // remove the deleted prehistoricCreature from the prehistoricCreatures array
    prehistoricData.splice(req.params.idx, 1)

    // save the new prehistoricCreatures to the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))

    res.redirect('/prehistoric_creatures')
})

module.exports = router