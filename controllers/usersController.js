/* NPM Require */
const fs = require("fs");
const path = require("path");
const BCRYPT = require("bcrypt");

/* Reading Data Base from JSON */
let userBD = JSON.parse(
  fs.readFileSync("data/userBD.json", { encoding: "utf-8" })
);

/* Code of all Controllers */
let usersController = {
  login: function (req, res) {
    res.render("usersViews/login");
  },
  /* crear ruta para access de ususarios o admin */
  access: (req, res) => {
    let user = req.body.email;
    let userPass = req.body.password;
    /* Finding the User and validation with Bcrypt*/
    for (let i = 0; i < userBD.length; i++) {
      if (
        user === userBD[i].email &&
        BCRYPT.compareSync(userPass, userBD[i].password1)
      ) {
        res.redirect("usersList");
      }
    }
    res.send("El usuario no existe");
  },
  search: (req, res) => {
    /* Search with Query */
    let query = req.query.search;
    let search = [];
    for (let i = 0; i < userBD.length; i++) {
      if (userBD[i].name.includes(query)) {
        search.push(userBD[i]);
      }
    }
    res.render("usersViews/userSearch", { search: search });
    /* En caso de error como atajarlo?? */
  },
  register: (req, res) => {
    res.render("usersViews/register");
  },
  create: (req, res, next) => {
    /* New user with POST */
    let newUser = {
      id: null,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      birht: req.body.birht,
      adress: req.body.adress,
      userTipe: req.body.userTipe,
      interest: req.body.interest,
      photo: "userDefault.jpg",
      password1: BCRYPT.hashSync(req.body.password1, 10),
    };

    /* Giving a new Id to new user */
    let newId;
    for (let i = 0; i <= userBD.length; i++) {
      newId = i + 1;
      newUser.id = newId;
    }

    /* Giving an image to DB */
    if (req.files.length) {
      newUser.photo = req.files[0].filename;
    }

    /* New sequence of all .id */
    for (let i = 0; i < userBD.length; i++) {
      userBD[i].id = i + 1;
    }

    /* Push the new product and writing a new JSON */
    userBD.push(newUser);
    let newUserToJSON = JSON.stringify(userBD);
    fs.writeFileSync("data/userBD.json", newUserToJSON);

    res.render("usersViews/okUser");
    /* Como enviar solo un alert y redirigir al usersList ?? */
  },
  list: (req, res) => {
    res.render("usersViews/usersList", { userBD: userBD });
  },
  detail: (req, res) => {
    let userId = parseInt(req.params.idUser);
    let userSelect;
    /* Finding the same Id user with GET*/
    for (let i = 0; i < userBD.length; i++) {
      if (userId === userBD[i].id) {
        userSelect = userBD[i];
      }
    }
    res.render("usersViews/detailUser", { userSelect: userSelect });
  },
  edit: (req, res) => {
    /* Finding the same Id user with GET*/
    let userEditId = parseInt(req.params.idUser);
    let userEdit;
    /* With the Id, finding a user to edit*/
    for (let i = 0; i < userBD.length; i++) {
      if (userEditId === userBD[i].id) {
        userEdit = userBD[i];
      }
    }
    res.render("usersViews/userEdit", { userEdit: userEdit });
  },
  upDate: (req, res, next) => {
    let position;
    /* Finding the position and Id user with PUT/POST*/
    for (let i = 0; i < userBD.length; i++) {
      if (parseInt(req.body.id) === userBD[i].id) {
        position = i;
      }
    }

    /* Compare current passwword and edit for a new (true) */
    if (BCRYPT.compareSync(req.body.password1, userBD[position].password1)) {
      /* Editing user */
      (userBD[position].name = req.body.name),
        (userBD[position].lastName = req.body.lastName),
        (userBD[position].email = req.body.email),
        (userBD[position].birht = req.body.birht),
        (userBD[position].adress = req.body.adress),
        (userBD[position].userTipe = req.body.userTipe),
        (userBD[position].interest = req.body.interest),
        (userBD[position].photo = req.body.photo),
        (userBD[position].password1 = BCRYPT.hashSync(req.body.password2, 10));
    } else {
      return res.send("contraseña invalida");
    }

    if (req.files.length === 0) {
      userBD[position].photo = "userDefault.jpg";
    } else {
      userBD[position].photo = req.files[0].filename;
    }

    /* Writing a new JSON */
    let editUserToJSON = JSON.stringify(userBD);
    fs.writeFileSync("data/userBD.json", editUserToJSON);

    res.redirect("/users/usersList");
  },
  delete: (req, res) => {
    /* Finding the position and Id user with DELETE/POST*/
    let userIdDelete = parseInt(req.params.idUser);
    let userDelete;
    for (let i = 0; i < userBD.length; i++) {
      if (userIdDelete === userBD[i].id) {
        userDelete = i;
      }
    }

    /* Delete user */
    userBD.splice(userDelete, 1);

    /* New sequence of all .id */
    for (let i = 0; i < userBD.length; i++) {
      userBD[i].id = i + 1;
    }

    /* Writing a new JSON */
    let deleteBDtoJSON = JSON.stringify(userBD);
    fs.writeFileSync("data/userBD.json", deleteBDtoJSON);

    res.redirect("/users/usersList");
  },
};

module.exports = usersController;
