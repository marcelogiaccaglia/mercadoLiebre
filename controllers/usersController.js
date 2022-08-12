const userBD = require("../data/userBD");

let usersController = {
  login: function (req, res) {
    res.render("usersViews/login");
  },
  register: function (req, res) {
    res.render("usersViews/register");
  },
  create: (req, res) => {
    /* capturar informacion para agregar a BD ???*/
    res.render("usersViews/okUser");
  },
  list: (req, res) => {
    res.render("usersViews/usersList", { userBD: userBD });
  },
  detail: (req, res) => {
    let userId = parseInt(req.params.idUser);
    userId = userId - 1;
    userSelect = userBD[userId];
    res.render("usersViews/detailUser", { userSelect: userSelect });
  },
  edit: (req, res) => {
    let userEditId = parseInt(req.params.idUser);
    userEditId = userEditId - 1;
    let userEdit = userBD[userEditId];
    res.render("usersViews/userEdit", { userEdit: userEdit });
  },
  upDate: (req, res) => {
    /* capturar informacion para edita BD ???*/
    res.redirect("/users/usersList");
  },
  delete: (req, res) => {
    console.log(
      req.params.idUser
    ); /* capturar el id para eliminar de la BD ???*/
    res.redirect("/users/usersList");
  },
};

module.exports = usersController;
