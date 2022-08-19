/* NPM Require */
const fs = require("fs");
const path = require("path");

/* Reading Data Base from JSON */
let userBD = JSON.parse(
  fs.readFileSync("data/userBD.json", { encoding: "utf-8" })
);

let usersController = {
  login: function (req, res) {
    res.render("usersViews/login");
  },
  /* crear ruta para access de ususarios o admin */
  /* Validar con bcrypt */
  access: (req, res) => {
    let user = req.body.email;
    /* Finding the User */
    for (let i = 0; i < userBD.length; i++) {
      if (user === userBD[i].email) {
        res.redirect("usersList");
      } else {
        res.send("El usuario no existe");
      }
    }
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
  create: (req, res) => {
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
      photo: req.body.photo,
      password1: req.body.password1,
      password2: req.body.password2,
    };

    /* Giving a new Id to new user */
    let newId;
    for (let i = 0; i <= userBD.length; i++) {
      newId = i + 1;
      newUser.id = newId;
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
  upDate: (req, res) => {
    let position;
    /* Finding the position and Id user with PUT/POST*/
    for (let i = 0; i < userBD.length; i++) {
      if (parseInt(req.body.id) === userBD[i].id) {
        position = i;
      }
    }
    /* Editing user */
    (userBD[position].name = req.body.name),
      (userBD[position].lastName = req.body.lastName),
      (userBD[position].email = req.body.email),
      (userBD[position].birht = req.body.birht),
      (userBD[position].adress = req.body.adress),
      (userBD[position].userTipe = req.body.userTipe),
      (userBD[position].interest = req.body.interest),
      (userBD[position].photo = req.body.photo),
      (userBD[position].password1 = req.body.password1),
      (userBD[position].password2 = req.body.password2);

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
