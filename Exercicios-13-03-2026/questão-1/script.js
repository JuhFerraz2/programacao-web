//1 - Crie um jogo onde o computador gera um número aleatório de 1 a 20, e o usuário
//precisa adivinhar qual é. O jogo deve dar dicas se o número digitado for maior ou menor
//que o número secreto. O jogo só termina quando o usuário acertar.
//Dica: utilize a biblioteca Math para gerar os números aleatórios;

let numale = document.getElementById("ale");

var num;

numale.onclick = function(){
    alert("Numero aleatorio gerado!");
    
    num = Math.floor(Math.random() * 20) + 1;

    var num2; 
 
    while(num2 != num) {

console.log("adivinhe o número aleatorio!");
num2 = parseFloat(window.prompt("O Número é: "));
console.log(typeof num2);
if (num2 > num){

    console.log("Ops, número errado, o número é menor");

} else if(num2 < num){

    console.log("Ops, número errado, o número é maior");

} else if (num2 == num){
    console.log("parabens! você acertou");
}

}
}
