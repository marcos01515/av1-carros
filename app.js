const express = require("express");

const app = express();

app.use(express.json());

// Lista de carros em memória
let carros = [];
let proximoId = 1;

// CADASTRAR CARRO
app.post("/carros", (req, res) => {
    const { marca, modelo, ano, preco } = req.body;

    if (!marca || !modelo || !ano || !preco) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios."
        });
    }

    const novoCarro = {
        id: proximoId++,
        marca,
        modelo,
        ano,
        preco
    };

    carros.push(novoCarro);

    res.status(201).json(novoCarro);
});

// LISTAR TODOS OS CARROS
app.get("/carros", (req, res) => {
    res.json(carros);
});

// BUSCAR CARRO POR ID
app.get("/carros/:id", (req, res) => {
    const id = Number(req.params.id);

    const carro = carros.find(c => c.id === id);

    if (!carro) {
        return res.status(404).json({
            mensagem: "Carro não encontrado."
        });
    }

    res.json(carro);
});

// EDITAR CARRO
app.put("/carros/:id", (req, res) => {
    const id = Number(req.params.id);

    const carro = carros.find(c => c.id === id);

    if (!carro) {
        return res.status(404).json({
            mensagem: "Carro não encontrado."
        });
    }

    const { marca, modelo, ano, preco } = req.body;

    if (!marca || !modelo || !ano || !preco) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios."
        });
    }

    carro.marca = marca;
    carro.modelo = modelo;
    carro.ano = ano;
    carro.preco = preco;

    res.json(carro);
});

// EXCLUIR CARRO
app.delete("/carros/:id", (req, res) => {
    const id = Number(req.params.id);

    const indice = carros.findIndex(c => c.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Carro não encontrado."
        });
    }

    carros.splice(indice, 1);

    res.json({
        mensagem: "Carro excluído com sucesso."
    });
});

// LIGAR SERVIDOR
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});