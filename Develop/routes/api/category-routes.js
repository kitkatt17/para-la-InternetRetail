const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(categoryInfo);
  }catch (error) {
    res.status(200).json(error);
    }
  }
);

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryInfo) {
      res.status(404).json({ message: 'Category not found with the specified ID!' });
      return;
    }
   
    res.status(200).json(categoryInfo);
  }catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const categoryInfo = await Category.create(req.body, {
      include: { model: Product },
    });

    res.status(201).json(categoryInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update({
    category_name: req.body.category_name,
},
{
    where: {
      id: req.params.id,
    },
  }
)
    .then((updateCategory) => {
      res.json(updateCategory);
      console.log(updateCategory);
    })
    .catch((error) => {
      res.json(error);
    })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryInfo = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryInfo) {
      res.status(404).json({ message: 'No category in sight with this ID..'});
      return;
    }
    res.status(200).json(categoryInfo);
  }catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
