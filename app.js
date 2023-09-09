const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

/////socket
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
});
//socket

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.get("/test", async (req, res, next) => {
  
  const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "tomizdebski@gmail.com",
      pass: "lgfladobyxjptqyy",
    },
  };

  const send = (data) => {
    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        return info.response;
      }
    });
  };

  const data = {
    from: "sender@gmail.com",
    to: "lukas4096@gmail.com",
    subject: "Thank You",
    text: "dziekujemy za subscrypcje.",
  };
  try {
    send(data);
  } catch (error) {
    console.log(error)
  }
  
  res.send("udało się");

});


app.use("/api", require("./routes/api.route"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
