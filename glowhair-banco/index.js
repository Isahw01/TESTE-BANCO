const express = require("express");
const app = express();
const port = 5000;

const path = require("path");
const basePath = path.join(__dirname, "pages");

const mysql = require("mysql");
const exp = require("constants");

//Ler o body e transformar em json
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Busca no banco um registro específico de tipo de cabelo via ID
app.get("/tipo_cabelo/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM TBL_TIPO_CABELO WHERE id_tipo_cabelo = ${id}`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados[0]);
    }
  });
});

//Busca no banco um registro específico de problema via ID
app.get("/problema/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM TBL_PROBLEMA WHERE id_problema = ${id}`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados[0]);
    }
  });
});


//Busca no banco um registro específico de produto via ID
app.get("/produto/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM TBL_PRODUTO WHERE id_produto = ${id}`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados[0]);
    }
  });
});


//Busca no banco um registro específico de usuario via ID

app.get("/usuario/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM TBL_USUARIO WHERE id_usuario = ${id}`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados[0]);
    }
  });
});

app.get("/usuario/editar/:id", (req, res) => {
  res.sendFile(`${basePath}/editarusuario.html`);
});

app.post("/usuario/atualizar", (req, res) => {
  const id = req.body.idValor;
  const nome_usuario = req.body.nomeUsuario;
  const email = req.body.email;
  const cpf = req.body.cpf;
  const senha = req.body.senha;

  const sql = `UPDATE TBL_USUARIO SET email = '${nome_usuario}', '${email}', senha='${cpf}', telefone = '${senha}' WHERE id_usuario = ${id}`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      res.sendFile(`${basePath}/home.html`);
    }
  });
});

//rota para pegar lista de produtos do banco
app.get("/produto", (req, res) => {
  const sql = `SELECT * FROM TBL_PRODUTO`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados);
      res.sendFile(`${basePath}/home.html`);
    }
  });
});

//rota para pegar lista de usuarios do banco
app.get("/usuario", (req, res) => {
  const sql = `SELECT * FROM TBL_USUARIO`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados);
      res.sendFile(`${basePath}/home.html`);
    }
  });
});

//ROTAS PARA CADASTRO DE PRODUTO
app.get("/produto/cadastrar", (req, res) => {
  res.sendFile(`${basePath}/cadastrarproduto.html`);
});

app.post("/produto/insert", (req, res) => {
  const nome_responsavel = req.body.nomeResponsavel;
  const razao_social = req.body.razaoSocial;
  const nome_produto = req.body.nomeProduto;
  const categoria = req.body.categoria;
  const beneficios = req.body.beneficios;
  const como_usar = req.body.comoUsar;

  const sql = `INSERT INTO TBL_PRODUTO (nome_responsavel, razao_social, nome_produto, categoria, beneficios, como_usar) VALUES ('${nome_responsavel}','${razao_social}','${nome_produto}','${categoria}' , '${beneficios}' , '${como_usar}')`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/home", (req, res) => {
  res.sendFile(`${basePath}/home.html`);
});

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/home.html`);
});

app.use((req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`);
});

//ROTAS PARA CADASTRO DE USUARIOS

app.get("/usuario/cadastrar", (req, res) => {
  res.sendFile(`${basePath}/cadastrarusuario.html`);
});

app.post("/usuario/insert", (req, res) => {
  const nome_usuario = req.body.nomeUsuario;
  const email = req.body.email;
  const cpf = req.body.cpf;
  const senha = req.body.senha;

  const sql = `INSERT INTO TBL_USUARIO (nome_usuario, email, cpf, senha) VALUES ('${nome_usuario}','${email}','${cpf}','${senha}')`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/home", (req, res) => {
  res.sendFile(`${basePath}/home.html`);
});

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/home.html`);
});

app.use((req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`);
});



//Conectando ao banco
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodeBercario",
});

conn.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Conectado com sucesso");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
});
