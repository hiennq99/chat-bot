const sql = require("../../config/database");

// constructor
const scriptQuestion = function (scriptQuestion) {
  this.id_script = scriptQuestion.id_script;
  this.id_question = scriptQuestion.id_question;
  this.position = scriptQuestion.position;
};

scriptQuestion.create = (newscriptQuestion, result) => {
  sql.query("INSERT INTO script_question SET ?", newscriptQuestion, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created script_question: ", { id: res.insertId, ...newscriptQuestion });
    result(null, { id: res.insertId, ...newscriptQuestion });
  });
};

scriptQuestion.search = (scriptQuestionId, result) => {
  sql.query(`SELECT * FROM script_question WHERE id = ${scriptQuestionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found scriptQuestion: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found scriptQuestion with the id
    result({ kind: "not_found" }, null);
  });
};

scriptQuestion.getAll = result => {
  sql.query("SELECT * FROM scripts INNER JOIN script_question ON scripts.id = script_question.id_script INNER JOIN questions ON script_question.id_question = questions.id ORDER BY scripts.id,position", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("scriptQuestions: ", res);
    result(null, res);
  });
};

scriptQuestion.update = (id, scriptQuestion, result) => {
  sql.query(
    "UPDATE script_question SET id_script = ? id_question = ? id_position = ? WHERE id_script = ? id_question = ?",
    [scriptQuestion.id_script, scriptQuestion.id_question, scriptQuestion.position, scriptQuestion.id_script, scriptQuestion.id_question],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found scriptQuestion with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated scriptQuestion: ", { id: id, ...scriptQuestion });
      result(null, { id: id, ...scriptQuestion });
    }
  );
};

scriptQuestion.delete = (id, result) => {
  sql.query("DELETE FROM script_question WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found scriptQuestion with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted script_question with id: ", id);
    result(null, res);
  });
};


module.exports = scriptQuestion;
