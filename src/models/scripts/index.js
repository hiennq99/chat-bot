const sql = require("../../config/database");

// constructor
const scripts = function (scripts) {
  this.name = scripts.name;
};

scripts.create = (newscripts, result) => {
  sql.query("INSERT INTO scripts SET ?", newscripts, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created scripts: ", { id: res.insertId, ...newscripts });
    result(null, { id: res.insertId, ...newscripts });
  });
};

scripts.search = (scriptsId, result) => {
  sql.query(`SELECT * FROM scripts WHERE id = ${scriptsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found scripts: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found scripts with the id
    result({ kind: "not_found" }, null);
  });
};

scripts.getAll = result => {
  sql.query("SELECT * FROM scripts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("scriptss: ", res);
    result(null, res);
  });
};

scripts.update = (id, scripts, result) => {
  sql.query(
    "UPDATE scripts SET content = ? WHERE id = ?",
    [scripts.content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found scripts with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated scripts: ", { id: id, ...scripts });
      result(null, { id: id, ...scripts });
    }
  );
};

scripts.delete = (id, result) => {
  sql.query("DELETE FROM scripts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found scripts with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted scripts with id: ", id);
    result(null, res);
  });
};


module.exports = scripts;
