const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE cats (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, votes INT)"
  );
  db.run(
    "CREATE TABLE dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, votes INT)"
  );
  //INTEGER PRIMARY KEY AUTOINCREMENT pra não precisar passar o id no body, passa na url da requisicao
});


app.post("/cats", (req, res) => {
  //aqui estou usando prepared statement para parâmetros vinculados ao invés de concatenação de strings

  const name = req.body.name;

  //permitindo apenas string e não pode ser uma string vazia, null, NaN, undefined, false ou 0 e campos obrigatórios
  if (typeof name !== "string" || !name.length) {
    return res.status(400).send("Nome inválido.");
  }
  const stmt = db.prepare("INSERT INTO cats (name, votes) VALUES (?, 0)");
  stmt.run(name, function (err) {
    if (err) {
      res.status(500).send("Erro ao inserir no banco de dados");
    } else {
      res.status(201).json({ id: this.lastID, name, votes: 0 });
    }
  });
  stmt.finalize();
});

app.post("/dogs", (req, res) => {
  //aqui estou usando prepared statement para parâmetros vinculados ao invés de concatenação de strings

  const name = req.body.name;

  //permitindo apenas string e não pode ser uma string vazia, null, NaN, undefined, false ou 0 e campos obrigatórios
  if (typeof name !== "string" || !name.length) {
    return res.status(400).send("Nome inválido.");
  }
  const stmt = db.prepare("INSERT INTO dogs (name, votes) VALUES (?, 0)");
  stmt.run(name, function (err) {
    if (err) {
      res.status(500).send("Erro ao inserir no banco de dados");
    } else {
      res.status(201).json({ id: this.lastID, name, votes: 0 });
    }
  });
  stmt.finalize();
});

app.post("/vote/:animalType/:id", (req, res) => {
  const { animalType, id } = req.params; //para passar o tipo e o id do animal

  //validação para garantir que seja apenas cats e dogs
  if (!["cats", "dogs"].includes(animalType)) {
    return res.status(400).send("Animal inválido. Apenas cats e dogs.");
  }
  db.get(`SELECT id FROM ${animalType} WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).send("Erro ao consultar o banco de dados.");
    }
    //validação para verificar se o animal existe no banco ou não
    if (!row) {
      return res.status(404).send("Registro de animal não encontrado.");
    }
    db.run(
      //atualização dos fotos
      `UPDATE ${animalType} SET votes = votes + 1 WHERE id = ?`,
      [id],
      (updateErr) => {
        if (updateErr) {
          return res.status(500).send("Erro ao atualizar o banco de dados.");
        }
        res.status(200).send("Voto computado!");
      }
    );
  });
});

app.get("/cats", (req, res) => {
  db.all("SELECT * FROM cats", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.get("/dogs", (req, res) => {
  db.all("SELECT * FROM dogs", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ocorreu um erro!");
});

app.listen(port, () => {
  console.log(`Cats and Dogs Vote app listening at http://localhost:${port}`);
});