var cadena = "";
var tiempos = [];

function getLetter(e) {
  var d = new Date();
  tiempos.push(d);
  if(tiempos.length>1){
    intermedio();
  }
  var keynum;
  //para ie
  if (window.event) {
    keynum = e.keyCode;
  } else if (e.which) {
    //el resto
    keynum = e.which;
  }
  var letra = String.fromCharCode(keynum);
  document.getElementById("pulsado").innerHTML = "<b>" + letra + "</b>";
  cadena += letra;
  document.getElementById("cadena").innerHTML = "<i>" + cadena + "</i>";
  document.getElementById("tiempoinicio").innerHTML = tiempos[0].toLocaleTimeString();
  document.getElementById("tiempoinicio").value = tiempos[0].toLocaleTimeString();
}
function intermedio(){
  var tiempo_size = tiempos.length;
  var tiempo_intermedio = display(
    tiempos[tiempo_size - 1].getTime() - tiempos[tiempo_size - 2].getTime()
  );
  document.getElementById("tiempointermedio").innerHTML = tiempo_intermedio;
  document.getElementById("tiempointermedio").value = tiempo_intermedio;
  media = 0;
  for(i=1; i<tiempo_size;i++){
    console.log(i+' '+(tiempos[i].getTime()-tiempos[i-1].getTime()));
    media+=(tiempos[i].getTime()-tiempos[i-1].getTime());
  }  
  media /= tiempo_size;  
  document.getElementById("tiempomedio").innerHTML = display(media.toFixed(2));
  document.getElementById("tiempomedio").value = display(media.toFixed(2));
}
function terminar() {
  var final = display(
    tiempos[tiempos.length - 1].getTime() - tiempos[0].getTime()
  );
  document.getElementById("tiempototal").innerHTML = final;
  document.getElementById("tiempototal").value = final;
}
function display(mills) {
  if (mills > 1000) return mills / 1000 + " s";
  return mills + " ms";
}
function limpiar() {
  document.getElementById("comentario").value = "";
  document.getElementById("pulsado").innerHTML = "";
  document.getElementById("cadena").innerHTML = "";
  cadena = "";
  tiempos = [];
  document.getElementById("tiempoinicio").innerHTML = "";
  document.getElementById("tiempototal").innerHTML = "";
  document.getElementById("tiempointermedio").innerHTML = "";
}