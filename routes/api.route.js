const router = require("express").Router();
require("../lib/lib");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const { saveFile } = require("../lib/lib");
const upload = multer({ dest: "uploads/" });
const salt = bcrypt.genSaltSync(10);

const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.post("/login/", async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/register", upload.single("avatar"), async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

  try {
    const { originalname, path } = req.file;
    const { firstName, lastName, password, email } = req.body;

    const newPathAvatar = saveFile(originalname, path);

    const userDoc = await prisma.users.create({
      data: {
        firstName,
        lastName,
        password: bcrypt.hashSync(password, salt),
        email,
        avatar: newPathAvatar,
      },
    });
    res.json(userDoc);
  } catch (error) {
    next(error);
  }
});

router.get("/users/", async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        instructor: true,
        student: true,
        skills: { include: { skill: true } },
      },
    });

    res.json(users);
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

router.get("/categories", async (req, res, next) => {
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
    const { id } = req.params;
    const lessons = await prisma.lessons.findMany({
      where: {
        instructorId: +id,
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
    const { id } = req.params;
    const lessons = await prisma.lessons.findMany({
      where: {
        categoryId: +id,
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
        instructor: true,
        student: true,
        category: true,
        localization: true,
        scores: true,
      },
    });
    res.json(lessons);
  } catch (error) {
    next(error);
  }
});

////////////////////////////////////////

const cpUpload = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

router.post("/lesson", cpUpload, async (req, res, next) => {
  console.log(req.body);
  console.log(req.files["photo"][0]);
  console.log(req.files["video"][0]);

  try {
    const photo = req.files["photo"][0];
    const video = req.files["video"][0];

    const { name, content, instructorId, categoryId, localizationId } =
      req.body;

    const newPathPhoto = saveFile(photo.originalname, photo.path);
    const newPathVideo = saveFile(video.originalname, video.path);

    const userDoc = await prisma.lessons.create({
      data: {
        name,
        content,
        instructorId: +instructorId,
        categoryId: +categoryId,
        localizationId: +localizationId,
        photo: newPathPhoto,
        video: newPathVideo,
      },
    });
    res.json(userDoc);
  } catch (error) {
    next(error);
  }
});

router.get("/lesson/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.lessons.findUnique({
      where: {
        id: +id,
      },
      include: {
        category: true,
        instructor: true,
        student: true,
        localization: true,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.patch("/lesson/:id", async (req, res, next) => {
  console.log(req.body);
  try {
    const { id } = req.params;
    //delete req.body.id
    const lessonUpdate = await prisma.lessons.update({
      where: {
        id: +id,
      },
      data: req.body,
    });
    res.json(lessonUpdate);
  } catch (error) {
    console.log(error);
    next(error);
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

router.post("/barter-lessons/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { lessonId, lessonExId } = req.body;
    const barterAdd = await prisma.barterLessons.create({
      data: {
        lessonId: +lessonId,
        lessonExId: +lessonExId,
      },
    });
    const userUpdate = await prisma.users.update({
      where: {
        id: +id,
      },
      data: req.body,
    });
    res.json(barterAdd);
  } catch (error) {
    next(error);
  }
});

router.post("/barter-lessons/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    const { lessonId, lessonExId } = req.body;
    const barterAdd = await prisma.barterLessons.create({
      data: {
        lessonId: +lessonId,
        lessonExId: +lessonExId,
      },
    });
    res.json(barterAdd);
  } catch (error) {
    next(error);
  }
});

router.get("/barter-lessons/", async (req, res, next) => {
  try {
    const barterLesson = await prisma.barterLessons.findMany({
      include: {
        lesson: true,
        lessonEx: true,
      },
    });
    res.json(barterLesson);
  } catch (error) {
    next(error);
  }
});

//nie działa
router.delete("/barter-lessons/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteLesson = await prisma.barterLessons.delete({
      where: {
        id: +id,
      },
    });
    res.json(deleteLesson);
  } catch (error) {
    next(error);
  }
});

router.post("/skills/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, level, userId } = req.body;
    const skillsAdd = await prisma.skills.create({
      data: {
        name: name,
        level: level,
      },
    });
    console.log(skillsAdd.id)
    const userUpdate = await prisma.usersSkills.create({
      data: {
        userId: +userId,
        skillId: +skillsAdd.id,
      },
    });

    res.json(skillsAdd);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
