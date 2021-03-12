const sql = require("../../config/database");

// constructor
const answers = function (answers) {
  this.id_question = answers.id_question
  this.content = answers.content;
};

answers.create = (newanswers, result) => {
  sql.query("INSERT INTO answers SET ?", newanswers, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created answers: ", { id: res.insertId, ...newanswers });
    result(null, { id: res.insertId, ...newanswers });
  });
};

answers.search = (answersId, result) => {
  sql.query(`SELECT * FROM answers WHERE id = ${answersId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found answers: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found answers with the id
    result({ kind: "not_found" }, null);
  });
};

answers.getAll = result => {
  sql.query("SELECT * FROM answers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("answerss: ", res);
    result(null, res);
  });
};

answers.update = (id, answers, result) => {
  console.log(id)
  sql.query(
    "UPDATE answers SET content = ? WHERE id = ?",
    [answers.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found answers with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated answers: ", { id: id, ...answers });
      result(null, { id: id, ...answers });
    }
  );
};

answers.delete = (id, result) => {
  sql.query("DELETE FROM answers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found answers with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted answers with id: ", id);
    result(null, res);
  });
};


module.exports = answers;
