const sql = require("../../config/database");

// constructor
const question = function (question) {
  this.content = question.content;
};

question.create = (newquestion, result) => {
  sql.query("INSERT INTO questions SET ?", newquestion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created question: ", { id: res.insertId, ...newquestion });
    result(null, { id: res.insertId, ...newquestion });
  });
};

question.search = (questionId, result) => {
  sql.query(`SELECT * FROM questions INNER JOIN answers ON questions.id_answer = answers.id WHERE id = ${questionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found question: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found question with the id
    result({ kind: "not_found" }, null);
  });
};

question.getAll = result => {
  sql.query("SELECT * FROM questions INNER JOIN answers ON questions.id_answer = answers.id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("questions: ", res);
    result(null, res);
  });
};

question.update = (id, question, result) => {
  console.log(id)
  sql.query(
    "UPDATE questions SET content = ? WHERE id = ?",
    [question.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found question with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated question: ", { id: id, ...question });
      result(null, { id: id, ...question });
    }
  );
};

question.delete = (id, result) => {
  sql.query("DELETE FROM questions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found question with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted question with id: ", id);
    result(null, res);
  });
};


module.exports = question;
