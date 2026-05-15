const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para processar dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Array para armazenar feedbacks em memória
let feedbacks = [];
let nextId = 1;

// Rota da página inicial com formulário
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Feedback do Curso</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                .container {
                    background-color: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    color: #555;
                }
                input, textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }
                textarea {
                    resize: vertical;
                    min-height: 100px;
                }
                button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    width: 100%;
                }
                button:hover {
                    background-color: #45a049;
                }
                .link {
                    display: block;
                    text-align: center;
                    margin-top: 20px;
                    color: #2196F3;
                    text-decoration: none;
                }
                .link:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Deixe seu Feedback</h1>
                <form action="/feedbacks/enviar" method="POST">
                    <div class="form-group">
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" required placeholder="Digite seu nome">
                    </div>
                    <div class="form-group">
                        <label for="comentario">Comentário:</label>
                        <textarea id="comentario" name="comentario" required placeholder="Digite seu feedback..."></textarea>
                    </div>
                    <button type="submit">Enviar Feedback</button>
                </form>
                <a href="/feedbacks/lista" class="link">Ver todos os feedbacks</a>
            </div>
        </body>
        </html>
    `);
});

// Rota para cadastrar feedback
app.post('/feedbacks/enviar', (req, res) => {
    const { nome, comentario } = req.body;
    
    if (!nome || !comentario) {
        return res.status(400).send('Nome e comentário são obrigatórios!');
    }
    
    const novoFeedback = {
        id: nextId++,
        nome: nome,
        comentario: comentario,
        data: new Date().toLocaleString('pt-BR')
    };
    
    feedbacks.push(novoFeedback);
    console.log(`Feedback adicionado: ${nome} - ${comentario}`);
    
    res.redirect('/feedbacks/lista');
});

// Rota para listar feedbacks
app.get('/feedbacks/lista', (req, res) => {
    const listaFeedbacks = feedbacks.map(feedback => `
        <div class="feedback-item" data-id="${feedback.id}">
            <div class="feedback-header">
                <strong>${escapeHtml(feedback.nome)}</strong>
                <span class="data">${feedback.data}</span>
            </div>
            <div class="feedback-comentario">${escapeHtml(feedback.comentario)}</div>
            <form action="/feedbacks/remover" method="POST" style="margin-top: 10px;">
                <input type="hidden" name="id" value="${feedback.id}">
                <button type="submit" class="btn-remover">Remover</button>
            </form>
        </div>
    `).join('');
    
    const html = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Feedbacks</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                }
                .container {
                    background-color: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin-bottom: 30px;
                }
                .feedback-item {
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 20px;
                }
                .feedback-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #eee;
                }
                .feedback-header strong {
                    color: #4CAF50;
                    font-size: 18px;
                }
                .data {
                    color: #999;
                    font-size: 12px;
                }
                .feedback-comentario {
                    color: #555;
                    line-height: 1.5;
                    margin: 10px 0;
                }
                .btn-remover {
                    background-color: #f44336;
                    color: white;
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .btn-remover:hover {
                    background-color: #da190b;
                }
                .sem-feedbacks {
                    text-align: center;
                    color: #999;
                    padding: 40px;
                }
                .link-voltar {
                    display: inline-block;
                    margin-top: 20px;
                    color: #2196F3;
                    text-decoration: none;
                }
                .link-voltar:hover {
                    text-decoration: underline;
                }
                .botoes {
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Feedbacks dos Alunos</h1>
                ${feedbacks.length === 0 ? 
                    '<div class="sem-feedbacks">Nenhum feedback cadastrado ainda.</div>' : 
                    listaFeedbacks}
                <div class="botoes">
                    <a href="/" class="link-voltar">← Voltar para o formulário</a>
                </div>
            </div>
        </body>
        </html>
    `;
    
    res.send(html);
});

// Rota para remover feedback
app.post('/feedbacks/remover', (req, res) => {
    const id = parseInt(req.body.id);
    
    const index = feedbacks.findIndex(feedback => feedback.id === id);
    
    if (index !== -1) {
        const removido = feedbacks.splice(index, 1)[0];
        console.log(`Feedback removido: ${removido.nome} - ${removido.comentario}`);
    }
    
    res.redirect('/feedbacks/lista');
});

// Função auxiliar para escapar caracteres HTML (evitar XSS)
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Pressione Ctrl+C para encerrar`);
});