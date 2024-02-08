const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// The `/api/tags` endpoint

// GET ALL (async/await)
router.get('/', async (req, res) => {
  const tags = await Tag.findAll({
    include: [{
      model: Product,
      as: 'tag_products'
    }]
  })
  res.json(tags);
});

// GET BY ID (async/await)
router.get('/:id', async (req, res) => {
  const tags = await Tag.findByPk(req.params.id, {
    include: [{
      model: Product,
      as: 'tag_products'
    }]
  })
  res.json(tags);
});

// CREATE (async/await)
router.post('/', async (req, res) => {
  try {
    const tags = await Tag.create(req.body)
    res.json(tags);
  } catch( err ) {
    res.status(500).json({ error: err.message })
  }
});

// UPDATE (async/await)
router.put('/:id', async (req, res) => {
  try {
    const tags = await Tag.update(
      req.body, 
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.json(tags)
  } catch( err ){
    res.status(500).json({ error: err.message })
  }
});

// DELETE (async/await)
router.delete('/:id', async (req, res) => {
  try {
    await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.json({ status: "ok" })
  } catch( err ){
    res.status(500).json({ error: err.message })
  }
});
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
