let bot1 = document.getElementById("Bot1");
let bot2= document.getElementById("Bot2");

var contador = 0;

bot1.onclick = function(){

    contador++;

    console.log(contador);
}

bot2.onclick = function(){
    if(contador > 0){
        contador--;
        console.log(contador);
    }else if(contador == 0){
        alert("o Contador já está em 0");
    } else if(contador < 0) {
        alert("NÃO É POSSIVEL");
        return 1;
    }
}

let texto = document.getElementById("Texto");
let resultado = document.getElementById("resultado"); 
let Resultado = document.getElementById("Resultado");

function contarCaracteresSemEspacos() {
            let valor = texto.value;
            
            let semEspacos = valor.replace(/\s/g, '');
            let quantidade = semEspacos.length;
            Resultado.innerHTML = quantidade;
        }
        
        texto.oninput = function() {
            contarCaracteresSemEspacos();
        };
        

texto.onkeydown = function(event){
    if(event.key == "Enter"){ 
        console.log("teste");
        resultado.innerHTML = texto.value;
        texto.value = "";
        console.log("Número de caracteres sem espaços:", Resultado.innerHTML);
    }
}

var listaOrdenada;
var listanaoordenada;

function tipoDaLista(){
    let lista = document.getElementById("Lista").value;
    console.log(lista);
    var listinha;
    
    switch(lista){
        case "Listaordenada":
            listinha = listaOrdenada;
            break;
        case "Listanoor":
            listinha = listanaoordenada;
            break;
        default:
            console.log("escolha uma opção");
            return;
    }
    console.log(listinha);

    // Cria o elemento base dependendo do tipo de lista
    let elementoLista;
    let itens = ["Item 1", "Item 2", "Item 3"]; // Itens de exemplo
    
    if(lista === "Listaordenada") {
        elementoLista = document.createElement("ol"); // Lista ordenada
    } else {
        elementoLista = document.createElement("ul"); // Lista não ordenada
    }
    
    // Adiciona os itens à lista
    for(let i = 0; i < itens.length; i++){
        let li = document.createElement("li");
        li.textContent = itens[i];
        elementoLista.append(li);
    }
    
    // Adiciona a lista à página
    let container = document.getElementById("containerListas");
    if(container) {
        container.appendChild(elementoLista);
    } else {
        // Se não existir um container, adiciona ao body
        document.body.appendChild(elementoLista);
    }
}