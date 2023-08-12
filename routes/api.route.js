const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.get("/users/", async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({
      include: { 
        lessons: true,
        teachers: true,
        students: true 
      },
    });


    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/user/", async (req, res, next) => {
  try {
    const userAdd = await prisma.users.create({ data: req.body });
    res.json(userAdd);
  } catch (error) {
    next(error);
  }
});

router.delete("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.users.delete({
      where: {
        id: +id,
      },
    });
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
});

router.patch("/user/:id", async (req, res, next) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    const userUpdate = await prisma.users.update({
      where: {
        id: +id,
      },
      data: req.body,
    });
    res.json(userUpdate);
  } catch (error) {
    next(error);
  }
});

router.get("/categories/", async (req, res, next) => {
  try {
    const categories = await prisma.categories.findMany({
      include: { lesson: true },
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.post("/category/", async (req, res, next) => {
  try {
    const categoryAdd = await prisma.categories.create({ data: req.body });
    res.json(categoryAdd);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id/lessons/", async (req, res, next) => {

  try {
    const {id} = req.params
    const lessons = await prisma.lessons.findMany({
      where:{
        ownerId: +id
      },
      include: {
        category: true,
        localization: true,
      },
    });
    res.json(lessons);
  } catch (error) {
    next(error);
  }
});

router.get("/category/:id/lessons/", async (req, res, next) => {

  try {
    const {id} = req.params
    const lessons = await prisma.lessons.findMany({
      where:{
        categoryId: +id
      },
      include: {
        category: true,
        localization: true,
      },
    });
    res.json(lessons);
  } catch (error) {
    next(error);
  }
});

router.get("/lessons/", async (req, res, next) => {
  try {
    const lessons = await prisma.lessons.findMany({
      include: {
        category: true,
        localization: true,
        users: true,
      },
    });
    res.json(lessons);
  } catch (error) {
    next(error);
  }
});

router.post("/lesson", async (req, res, next) => {
  console.log({ data: req });

  try {
    const lessonAdd = await prisma.lessons.create({ data: req.body });
    res.json(lessonAdd);
  } catch (error) {
    next(error);
  }
});

router.get('/lesson/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const product = await prisma.lessons.findUnique({
      where: {
        id: +id
      },
      include: {
        category: true,
        owner: true,
        localization: true,
  
      },
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
  });

router.get("/localizations/", async (req, res, next) => {
  try {
    const localizations = await prisma.localizations.findMany({
      include: {
        lesson: true,
      },
    });
    res.json(localizations);
  } catch (error) {
    next(error);
  }
});

router.get("/teachers/", async (req, res, next) => {
  try {
    const teachers = await prisma.teachers.findMany({
      include: {
        lesson: true,
        user: true
      },
    });
    res.json(teachers);
  } catch (error) {
    next(error);
  }
});

router.get("/students/", async (req, res, next) => {
  try {
    const students = await prisma.students.findMany({
      include: {
        lesson: true,
        user: true
      },
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
});






module.exports = router;
