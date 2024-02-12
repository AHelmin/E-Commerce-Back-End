const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET ALL (async/await)
router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: [{
      model: Product,
    }]
  })
  res.json(categories);
});

// GET BY ID (async/await)
router.get('/:id', async (req, res) => {
  const categories = await Category.findByPk(req.params.id, {
    include: [{
      model: Product,
    }]
  })
  res.json(categories);
});

// CREATE (async/await)
router.post('/', async (req, res) => {
  try {
    const categories = await Category.create(req.body)
    res.json(categories);
  } catch( err ) {
    res.status(500).json({ error: err.message })
  }
});

// UPDATE (async/await)
router.put('/:id', async (req, res) => {
  try {
    const categories = await Category.update(
      req.body, 
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.json(categories)
  } catch( err ){
    res.status(500).json({ error: err.message })
  }
});

// DELETE (async/await)
router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy(
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

module.exports = router;
