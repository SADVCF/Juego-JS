// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

//Configuración de la aplicación


//Imagenes iniciales del jugador
document.getElementsByTagName("img")[0].src=("img/piedraJugador.png");
document.getElementsByTagName("img")[1].src=("img/papelJugador.png");
document.getElementsByTagName("img")[2].src=("img/tijeraJugador.png");

//Asignación de Id a cada imagen
document.getElementsByTagName("img")[0].id=("piedra");
document.getElementsByTagName("img")[1].id=("papel");
document.getElementsByTagName("img")[2].id=("tijera");

/*Aplicación de estilo de imagen seleccionada al hacer click en la opción escogida.
Aplicación también del estilo de imagen no seleccionada a las opciones no escogidas
además de eliminar el estilo de opcion seleccionada para que no se quede con marco
rojo en caso de haber sido seleccionada en la partida anterior*/

const imagenes = document.getElementsByTagName("img");
for(let i = 0; i < imagenes.length; i++){
  imagenes[i].addEventListener("click", function(){
    this.classList.add("seleccionado");
    this.classList.remove("noSeleccionado");
    
    /*Guardamos la tirada seleccionada por el jugador*/ 
    tiradaJugador=this.id;
    
    for(let j = 0; j < imagenes.length; j++){
      if(j !== i){
          imagenes[j].classList.add("noSeleccionado");
          imagenes[j].classList.remove("seleccionado");
      }
    }
  });
}

//Configuración de los botones añadiendo un evento al hacer click en cada uno de ellos

document.getElementsByTagName("button")[0].addEventListener("click",jugar);
document.getElementsByTagName("button")[1].addEventListener("click",ya);
document.getElementsByTagName("button")[2].addEventListener("click",reset);



//Comienzo de la partida

/*Reconocimiento de nombre de usuario y número de partidas a jugar y comprobación 
de requisitos de nombre y número de partidas*/
let nombre="";
    let inputNombre=document.getElementsByTagName("input")[0];
    let inputPartidas=document.getElementsByTagName("input")[1];
    let partidasMaximas;

function jugar(){
  let nombreJugador= document.getElementsByTagName("input")[0].value;
  

    //Caso en que ambos campos son incorrectos y se pintan de rojo
    if((nombreJugador.length<=3)||(!isNaN(nombreJugador[0]))){
    inputNombre.classList.add("fondoRojo");
    
        if(inputPartidas.value<=0){
        inputPartidas.classList.add("fondoRojo");
        }
        else{
          inputPartidas.classList.remove("fondoRojo");
        }

        
    }
    //Caso en que únicamente es incorrecto el nombre introducido
    else if((nombreJugador.length<=3)||(!isNaN(nombreJugador[0]))){
        inputNombre.classList.add("fondoRojo");
        if(inputPartidas.value>0){
          inputPartidas.classList.remove("fondoRojo");
        }
    }
    //Caso en que únicamente es incorrecto el número de partidas
    else if(inputPartidas.value<=0){
        inputNombre.classList.remove("fondoRojo");
        inputPartidas.classList.add("fondoRojo");

    }
    
    //Caso en el que ambos campos son correctos y se puede jugar la partida
    else{
        inputNombre.classList.remove("fondoRojo");
        inputPartidas.classList.remove("fondoRojo");

        /*Desactivación de los campos para introducir nombre y número de partidas y
        actualización del número total de partidas a jugar en pantalla*/
        inputNombre.disabled=true;
        inputPartidas.disabled=true;
        total.innerHTML=inputPartidas.value;
        
        //Asignación del nombre del jugador para mostrar en resultados
        nombre=nombreJugador;
    }
}


//Elección, tirada e historial de partidas



let imgMaquina=document.getElementsByTagName("img")[3];

/*Valor inicial establecido en piedra por si acaso es la opción que quiere
jugar el jugador y al verla seleccionada le da al botón sin hacer click en 
ella primero*/
let tiradaJugador="piedra"; 
function ya(){
  //Se juega mientras no se supere el número de partidas indicado
  if (actual.innerHTML < Number(total.innerHTML)){

  /*Generación de un valor para la jugada de la máquina e impresión de la 
  imagen correspondiente a su jugada*/
    let tiradaMaquina=jugadaMaquina(posibilidades);

    imgMaquina.src="img/"+tiradaMaquina+"Ordenador.png";
    imgMaquina.id=tiradaMaquina;

//Lógica que establece y muestra el resultado de la partida

//Caso en que empatan
        if(tiradaJugador===tiradaMaquina){
        historial.innerHTML+="<li>Empate</li>\n";
      }

      //Casos en los que se gana o se pierde
      else if (tiradaJugador===posibilidades[0]){
        if(tiradaMaquina===posibilidades[1]){
          historial.innerHTML+="<li>Gana la máquina</li>\n";
        }
        else{
          historial.innerHTML+="<li>Gana "+nombre+"</li>\n";
        }
      }

      else if (tiradaJugador===posibilidades[1]){
        if(tiradaMaquina===posibilidades[2]){
          historial.innerHTML+="<li>Gana la máquina</li>\n";
        }
        else{
          historial.innerHTML+="<li>Gana "+nombre+"</li>\n";
        }
      }

      else if (tiradaJugador===posibilidades[2]){
        if(tiradaMaquina===posibilidades[0]){
          historial.innerHTML+="<li>Gana la máquina</li>\n";
        }
        else{
          historial.innerHTML+="<li>Gana "+nombre+"</li>\n";
        }
        //Actualización de el número de partidas jugadas
      }
      actual.innerHTML = Number(actual.innerHTML) + 1;

    }
    

}

//Función que genera y devuelve un valor aleatorio entre los 3 posibles
function jugadaMaquina(posibilidades){
    let valorAleatorio=Math.floor(Math.random() * posibilidades.length);
    return posibilidades[valorAleatorio];

}

//Función reset para reiniciar la partida
function reset(){
  historial.innerHTML+="<li>Nueva partida</li>\n";
  actual.innerHTML=0;
  total.innerHTML=0;
  inputPartidas.value=0;
  inputNombre.disabled=false;
  inputPartidas.disabled=false;
  imgMaquina.src="img/defecto.png";
}
