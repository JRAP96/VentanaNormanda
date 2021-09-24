const lienzo=document.querySelector("#lienzo");
const ctx=lienzo.getContext("2d");
const boton=document.querySelector("#boton");
const resetea=document.getElementById("resetea");
const entradaper=document.querySelector("#per");
const basedes=document.querySelector("#BaseDes");
const altdes=document.querySelector("#altdes");
const entradaColor=document.querySelector("#Color");
const mostrarbase=document.getElementById("mostrarbase");
const mostraraltura=document.getElementById("mostraraltura");
const mostrarperimetro=document.getElementById("mostrarperimetro");
const mostrararea=document.getElementById("mostrararea");
let tabla=document.getElementById("tabla");


// Funcion que dibuja la ventana en el canvas
let VentFun = function(xInicial,yInicial,base,alt,Color){
    ctx.beginPath();
    ctx.strokeStyle = Color;
    ctx.moveTo(xInicial,yInicial);
    ctx.lineTo(xInicial+base,yInicial);
    ctx.lineTo(xInicial+base,yInicial-(alt-base/2));
    ctx.arc(xInicial+(base/2),yInicial-(alt-base/2),base/2,0,Math.PI,true);
    ctx.lineTo(xInicial,yInicial);
    ctx.stroke();
}

// Funcion que borra el canvas
function borrarCanvas(){
    ctx.clearRect(0,0,500,500);
}

// Funcion que traza la ventana con los valores fijados
let dibujar= function(){
    let xInicial = 20; // fijamos el origen de coordenadas en la parte inderior izquierda.
    let yini = 490;
    let Base = parseFloat(basedes.value); // Ya estas variables tienen la informacion que me interesa.
    let Alt = parseFloat(altdes.value);
    let colore = entradaColor.value;
    VentFun(xInicial,yini,Base,Alt,colore);
}

// Funcion que calcula el area 
let calcArea = function () {
    let Base = parseFloat(basedes.value); // Ya estas variables tienen la informacion que me interesa.
    let Alt = parseFloat(altdes.value);
    let Area = Base*Alt+(Math.PI-4)*(Base*Base)/8;
    mostrararea.innerText=`Area: ${Area} px^2`;
}

// Funcion que calcula el perimetro

let calcPer = function () {
    let Base = parseFloat(basedes.value); // Ya estas variables tienen la informacion que me interesa.
    let Alt = parseFloat(altdes.value);
    let peri= 2*Alt+(Math.PI*Base/2);
    mostrarperimetro.innerText=`Perimetro: ${peri} px`;
}

// Lo que sucede con el deslizador Base y altura, idea de Pau para relacionar ambos deslizadores
basedes.addEventListener("mousemove",borrarCanvas); //acciones o eventos sobre el deslizador.
basedes.addEventListener("mousemove",dibujar);
basedes.addEventListener("mousemove",calcArea);
basedes.addEventListener("mousemove",calcPer);
altdes.addEventListener("mousemove",borrarCanvas);
altdes.addEventListener("mousemove",dibujar);
altdes.addEventListener("mousemove",calcArea);
altdes.addEventListener("mousemove",calcPer);
basedes.addEventListener("input",()=>{       //funcion evento que asocia ambos deslizadores.
    let Base = parseFloat(basedes.value);
    let per = parseInt(entradaper.value);
    altdes.value=per/2-(Math.PI*Base)/4;
    mostraraltura.innerText=altdes.value;
})
altdes.addEventListener("input",()=>{
    let Alt = parseFloat(altdes.value);
    let per = parseInt(entradaper.value);
    basedes.value=(2*per-4*Alt)/Math.PI;
    mostrarbase.innerText=basedes.value;
})


// Creamos la Tabla mediante la creacion de la "funcion" que dibujara la tabla y el elemento tabla y tbody
function generaTabla() {
    let TBody = document.getElementById("TBody");
    let tabla = document.createElement("table");
    let tblBody = document.createElement("tbody");

    // creamos las celdas con un ciclo for
    for (let i = 100; i < 500; i++) {
        // creamos ahora las filas tr
        let hilera=document.createElement("tr");

        for (let j = 0; j < 1; j++) {
            // creamos un elemento td celda y un nodo de texto, 
            let celda = document.createElement("td");
            let celda2 = document.createElement("td");
            let celda3 = document.createElement("td");
            // creamos las operaciones para la altura y area
            let a=entradaper.value/2-(Math.PI*i)/4;
            let ar=i*a+(Math.PI-4)*(i*i)/8;
            // y creamos los nodo de texto, 
            let textoCelda = document.createTextNode("Base: "+i);
            let textoCelda2 = document.createTextNode("Altura: "+a);
            let textoCelda3 = document.createTextNode("Area: "+ar);
            // Insertamos el texto en la celda respectiva td
            celda.appendChild(textoCelda);
            celda2.appendChild(textoCelda2);
            celda3.appendChild(textoCelda3);
            // Y ubicamos el td completo con texto al final de la fila correspondiente
            hilera.appendChild(celda);
            hilera.appendChild(celda2);
            hilera.appendChild(celda3);
        }
        // Y ahora aqui agregamos la fila completa al final de la tabla
        tblBody.appendChild(hilera);
    }
    // Ahora posicionamos el elemento tbody abajo del elemento table
    tabla.appendChild(tblBody);
    TBody.appendChild(tabla);
    tabla.setAttribute("border", "1");
}

// Funcion que borra la tabla, borrando los hijos, se desatara el evento cuando cambie la entrada
// del perimetro, con evento change. Tambien con el boton reset.
function borrarTabla() {
    let node = document.getElementById("TBody");
    while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
}
}

// Funcion que filtra puros numeros (casi) en la entrada
function filtroNum(ele) {
    // Almacenamos la entrada del teclado a ser filtrada
    key=ele.keyCode || ele.which;
    // ahora guardamos lo que el teclado nos genera (variable key) en la variable teclado
    teclado=String.fromCharCode(key);
    // declaramos en una variable (numero) string todos los numeros validos
    numero="0123456789";
    // verificamos si el caracter del teclado esta en la cadena o no (en la cadena numero)
    if(numero.indexOf(teclado)==-1){
        return false;
    }
}



boton.addEventListener("click",dibujar);
boton.addEventListener("click",calcArea);
boton.addEventListener("click",generaTabla);
resetea.addEventListener("click",borrarCanvas);
entradaper.addEventListener("keypress",filtroNum);
entradaper.addEventListener("change",borrarTabla);
resetea.addEventListener("click",borrarTabla);

basedes.addEventListener("mousemove",()=>{
    mostrarbase.innerText=`Base: ${basedes.value}`;
})
altdes.addEventListener("mousemove",()=>{
    mostraraltura.innerText=`Altura: ${altdes.value}`;
})