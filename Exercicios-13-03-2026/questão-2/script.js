//Crie um jogo de Pedra, Papel ou Tesoura onde:
//• O usuário escolhe uma das três opções digitando no prompt().
//• O computador escolhe uma opção aleatória.
//• O programa deve determinar o vencedor e exibir o resultado no console.log().
//Dica: utilize a biblioteca Math para gerar os números aleatórios (opções que o
//computador pode escolher);

let jogar = document.getElementById("jogo");

jogar.onclick = function() {
    var usuarioescolha = window.prompt("Escolha entre Pedra, Papel e tesoura: ").toLowerCase();
    
    // Array para validação e escolha do computador
    var opcoesValidas = ["pedra", "papel", "tesoura"];
    
    // Validar escolha do usuário
    if (opcoesValidas.includes(usuarioescolha)) {
        console.log("Usuário escolheu:" + ${usuarioescolha});
        
        // Escolha do computador
        var escolhaComputador = opcoesValidas[Math.floor(Math.random() * 3)];
        console.log(`Computador escolheu: ${escolhaComputador}`);
        
        // Verificar resultado
        if (usuarioescolha === escolhaComputador) {
            console.log("Empate!!!");
        } else if (
            (usuarioescolha === "pedra" && escolhaComputador === "tesoura") ||
            (usuarioescolha === "papel" && escolhaComputador === "pedra") ||
            (usuarioescolha === "tesoura" && escolhaComputador === "papel")
        ) {
            console.log("Você venceu! Parabéns!");
        } else {
            console.log("Computador venceu! Tente novamente.");
        }
    } else {
        console.log("Opção inválida! Escolha entre Pedra, Papel ou Tesoura.");
    }
}