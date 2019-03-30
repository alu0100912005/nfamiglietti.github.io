var cadena = "";
var tiempos = [];
const teclas = ["c1","c1s","d1","d1s","e1"];
var tiempo_size;

function getLetter(e) {    
  switch(e.key){
    case 'a': var url = `https://manzdev.github.io/piano-keys/${teclas[0]}.mp3`; break;
    case 'e': var url = `https://manzdev.github.io/piano-keys/${teclas[1]}.mp3`; break;
    case 'i': var url = `https://manzdev.github.io/piano-keys/${teclas[2]}.mp3`; break;
    case 'o': var url = `https://manzdev.github.io/piano-keys/${teclas[3]}.mp3`; break;
    case 'u': var url = `https://manzdev.github.io/piano-keys/${teclas[4]}.mp3`; break;   
  }
  //si está definida url, se le envia a la función reproducir
  if(url){reproducir(url);}   
  //fecha actual
  var d = new Date();
  //la almacenamos en el array de tiempos que es donde almacenaremos todos los tiempos en los que las letras se han pulsado
  tiempos.push(d);
  //desde que tenga más de una letra pulsada ya calcula el tiempo entre la última y la penúltima letra pulsada
  if(tiempos.length>1){
    intermedio();
  }
  //para almacenar el código de la tecla pulsada
  var codigo;
  //para ie
  if (window.event) {
    codigo = e.keyCode;
  } else if (e.which) {
    //el resto
    codigo = e.which;
  }
  //pasamos el codigo a letra
  var letra = String.fromCharCode(codigo);
  document.querySelector("#pulsado").innerHTML = "<b>" + letra + "</b>";
  //concatenamos la cadena de letras que hemos pulsado
  cadena += letra;
  document.querySelector("#cadena").innerHTML = "<i>" + cadena + "</i>";
  document.querySelector("#tiempoinicio").innerHTML = tiempos[0].toLocaleTimeString();  
}
//función que calcula el tiempo entre las dos últimas letras pulsadas
function intermedio(){
  //tamaño del array de letras
  tiempo_size = tiempos.length;
  var tiempo_intermedio = mostrar(tiempos[tiempo_size - 1].getTime() - tiempos[tiempo_size - 2].getTime());
  document.querySelector("#tiempointermedio").innerHTML = tiempo_intermedio;
  media = 0;
  for(i=1; i<tiempo_size;i++){    
    media+=(tiempos[i].getTime()-tiempos[i-1].getTime());
  }  
  media /= tiempo_size;  
  document.querySelector("#tiempomedio").innerHTML  = mostrar(media.toFixed(2));
}
//funcion que calcula el tiempo transcurrido entre la primera letra y la última letra pulsada
function terminar() {
	if(document.querySelector("#tabla_resultados")){
		document.querySelector("#tabla_resultados").remove();
	}
	
  var final = mostrar(tiempos[tiempos.length - 1].getTime() - tiempos[0].getTime());
  document.querySelector("#tiempototal").innerHTML  = final + '<br/>' + tiempos[tiempos.length - 1].toLocaleTimeString();
  var div_resultados = document.querySelector(".resultados");
	//enseño el div de la tabla con los resultados
  div_resultados.setAttribute("style","display:inline-block;");
  //creo la tabla
  var tabla = document.createElement("table");
	tabla.setAttribute("id","tabla_resultados");
  
  var th = document.createElement("th");
    th.innerHTML = "Posición";
  tabla.appendChild(th);
  th = document.createElement("th");
    th.innerHTML = "Tiempo";
  tabla.appendChild(th);
	th = document.createElement("th");
    th.innerHTML = "Letra";
  tabla.appendChild(th);
  //de cada tecla enseño su posición, hora en la que se pulsó y el caracter
  for(i=0; i<tiempo_size;i++){    
				var tr = document.createElement("tr");
					var td =  document.createElement("td");
					td.innerHTML = i+1;
				tr.appendChild(td);  
					td = document.createElement("td");
					td.innerHTML = tiempos[i].toLocaleTimeString();
				 tr.appendChild(td); 
					td = document.createElement("td");
					td.innerHTML = cadena[i];
				 tr.appendChild(td); 
				tabla.appendChild(tr);
  }
  div_resultados.appendChild(tabla);
}
//funcion para mostrar los segundos/mili segundos
function mostrar(mills) {
  if (mills > 1000) return mills / 1000 + " s";
  return mills + " ms";
}
//función que limpia de valores
function limpiar() {
  document.querySelector("#comentario").value = "";
  document.querySelector("#pulsado").innerHTML = "";
  document.querySelector("#cadena").innerHTML = "";
  cadena = "";
  tiempos = [];
  document.querySelector("#tiempoinicio").innerHTML = "";
  document.querySelector("#tiempototal").innerHTML = "";
  document.querySelector("#tiempointermedio").innerHTML = "";
  document.querySelector("#tiempomedio").innerHTML = "";
	document.querySelector("#tabla_resultados").remove();
	document.querySelector(".resultados").setAttribute("style","display:none;");
}
//función para reproducir el audio recibido por parámetro
function reproducir(url){
  var audio = new Audio(url);
  audio.play();
}