let tri = document.getElementById("Tri");

tri.onclick = function() {   
    var num = parseInt(window.prompt("Digite o número de linhas: "));
    
    // Validação básica
    if (isNaN(num) || num <= 0) {
        console.log("Por favor, digite um número válido maior que zero.");
        return;
    }
    
    console.log(`Triângulo com ${num} linhas:`);
    console.log(""); // Linha em branco
    
    for(var i = 1; i <= num; i++) {
        console.log("*".repeat(i));
    }
}