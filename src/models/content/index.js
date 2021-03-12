const sql = require("../../config/database");

// constructor
const contents = function (contents) {
  this.id_question = contents.id_question
  this.id_answers = contents.id_answers
};

contents.create = (newcontents, result) => {
  sql.query("INSERT INTO contents SET ?", newcontents, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created contents: ", { id: res.insertId, ...newcontents });
    result(null, { id: res.insertId, ...newcontents });
  });
};

contents.search = (contentsId, result) => {
  sql.query(`SELECT * FROM contents WHERE id = ${contentsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found contents: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found contents with the id
    result({ kind: "not_found" }, null);
  });
};

contents.getAll = result => {
  sql.query("SELECT * FROM contents", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("contentss: ", res);
    result(null, res);
  });
};

contents.update = (id, contents, result) => {
  sql.query(
    "UPDATE contents SET content = ? WHERE id = ?",
    [contents.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found contents with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated contents: ", { id: id, ...contents });
      result(null, { id: id, ...contents });
    }
  );
};

contents.delete = (id, result) => {
  sql.query("DELETE FROM contents WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found contents with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted contents with id: ", id);
    result(null, res);
  });
};


module.exports = contents;
