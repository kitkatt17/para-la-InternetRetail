const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(tagInfo);
  }catch (error) {
    res.status(200).json(error);
    }
  }
);

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagInfo) {
      res.status(404).json({ message: 'Tag not found with the specified ID!' });
      return;
    }
   
    res.status(200).json(tagInfo);
  }catch (error) {
    res.status(500).json(error);
  }

  }
);

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagInfo = await Tag.create(req.body);
      // id: req.body.tagName,

    res.status(200).json(tagInfo);
  }catch (error) {
    res.status(400).json(error);
  }
  }
);

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // try {
    const updateTag = await Tag.update({
        tag_name: req.body.tag_name,
    },
    {
        where: {
          id: req.params.id,
        },
      }
    )
        .then((updateTag) => {
          res.json(updateTag);
          console.log(updateTag);
        })
        .catch((error) => {
          res.json(error);
        })
    });
//   }
// );

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagInfo = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagInfo) {
      res.status(404).json({ message: 'No tag in sight with this ID..'});
      return;
    }
    res.status(200).json(tagInfo);
  }catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
