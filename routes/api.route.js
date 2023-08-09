const router = require('express').Router();
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.get('/users/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      include: {lessons: true},
    })
   
    res.json(users)

  } catch (error) {
    next(error)
  }
});



router.get('/categories/', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {lesson: true}
    })
    res.json(categories)

  } catch (error) {
    next(error)
  }
});

router.get('/lessons/', async (req, res, next) => {
  try {
    const lessons = await prisma.lesson.findMany({
      include: {
        category: true,
        localization: true,
        users: true
      }
    })
    res.json(lessons)

  } catch (error) {
    next(error)
  }
});

router.get('/localizations/', async (req, res, next) => {
  try {
    const localizations = await prisma.localization.findMany({
      include: {
        lesson: true,
      }
    })
    res.json(localizations)

  } catch (error) {
    next(error)
  }
});

router.post('/user/', async (req, res, next) => {
  
  try {
    const userAdd = await prisma.user.create({data:req.body})
    res.json(userAdd)
  } catch (error) {
    next(error)
  }
});

router.post('/category/', async (req, res, next) => {
  
  try {
    const categoryAdd = await prisma.category.create({data:req.body})
    res.json(categoryAdd)
  } catch (error) {
    next(error)
  }
});

// router.get('/products/:id', async (req, res, next) => {
// try {
//   const {id} = req.params
//   const product = await prisma.product.findUnique({
//     where: {
//       id: +id
//     },
//     include: {category: true},
//   })
//   res.json(product)
// } catch (error) {
//   next(error)
// }
// });



router.delete('/user/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const deletedUser = await prisma.user.delete({
      where: {
        id: +id,
      }
    })
    res.json(deletedUser)
  } catch (error) {
    next(error)
  }
});


router.patch('/user/:id', async (req, res, next) => {
  console.log(req.body)
  try {
    const {id} = req.params
    const userUpdate = await prisma.user.update({
      where: {
        id: +id,
      },
      data: req.body,
    })
    res.json(userUpdate)
  } catch (error) {
    next(error)
  }
});

router.post('/lesson', async (req, res, next) => {

  console.log({data:req.body})
  
  try {
    const lessonAdd = await prisma.lessonTest.create({data:req.body})
    res.json(lessonAdd)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
