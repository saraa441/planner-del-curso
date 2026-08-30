console.log("horario.js funciona");

// ==========================================
// RECUPERAR COLORES DE LOS BLOQUES
// ==========================================

let colorEstudio = localStorage.getItem("colorEstudio");
let colorDescanso = localStorage.getItem("colorDescanso");
let colorTareas = localStorage.getItem("colorTareas");

// ==========================================
// RECUPERAR COSAS DEL SCRIPT.JS
// ==========================================

let horario = JSON.parse(localStorage.getItem("horario"));
let horaInicio = localStorage.getItem("HoraInicio");
let duracionEstudio = localStorage.getItem("duracionEstudio");
let duracionDescanso = localStorage.getItem("duracionDescanso");
let tareas = JSON.parse(localStorage.getItem("tareas"));

// ==========================================
// CONVERTIR HORAS EN FORMATO LEGIBLE PARA CALCULAR
// ==========================================

let partesHoraInicio = horaInicio.split(":")

// Se guarda la separacion hecha en dos variables, una para las horas y otra para los minutos en formato de número//
let horaInicioHoras = Number(partesHoraInicio[0]);
let horaInicioMinutos = Number(partesHoraInicio[1]);

// Se calcula a que hora se empieza a partir de la hora de inicio puesta, pero en minutos //
let minutosActuales = horaInicioHoras * 60 + horaInicioMinutos;

// Se guarda la duración de los bloques de estudio y descanso en dos variables en formato numérico //
let duracionEstudioNumero = Number(duracionEstudio); 
let duracionDescansoNumero = Number(duracionDescanso);

// ==========================================
// CREAR HORARIO VISUAL
// ==========================================

const horarioVisual = document.getElementById("horarioVisual");

// ==========================================
// CREAR BLOQUES DEL HORARIO VISUAL
// ==========================================

for(let bloque of horario){
	
	// Se crea la variable para luego calcular la duracion del bloque según sea estudio, descanso o tarea //
	let duracionBloque
	
	// Si es una asignatura se pone en el plan con el diseño creado en el CSS //
	if(bloque.tipo === "estudio"){
		 
		duracionBloque = duracionEstudioNumero;
	}
	
	// Si es un descanso se pone en el plan con el diseño creado en el CSS //
	if(bloque.tipo === "descanso"){
		
		duracionBloque = duracionDescansoNumero;
	}
	
	// Si es una tarea se pone en el plan con el diseño creado en el CSS //
	if(bloque.tipo === "tarea"){
		
		// Se busca una tarea por su nombre y se guarda la misma en una variable, para luego poder mostrarla según su duración //
		let tareaEncontrada = tareas.find (tarea => tarea.nombre === bloque.tarea);
		duracionBloque = tareaEncontrada.duracion;
	}
	
	// Se calcula cuando acaba cada bloque para así poner la hora de fin en el horario //
	let minutosFinales = minutosActuales + duracionBloque;
	
	// Se convierten los minutos de inicio a horas y minutos dividiendo los minutos iniciales entre 60 para sacar la hora y usando el resto como los minutos //
	let horaActualHoras = Math.floor(minutosActuales / 60);
	let horaActualMinutos = minutosActuales % 60;
	
	// Se convierten los minutos de finalizacion a horas y minutos, primero se dividen los minutos finales entre 60 y se saca la hora, y luego el resto de la division son los minutos //
	let horaFinalHoras = Math.floor(minutosFinales / 60);
	let horaFinalMinutos = minutosFinales % 60;
	
	// Se juntan las dos partes de las horas y además se hace que cuando los minutos solo tengan una cifra se ponga un 0 delante //
	
	let horaInicioTexto = horaActualMinutos.toString();
	horaInicioTexto = horaInicioTexto.padStart(2, "0");
	
	let horaFinalTexto = horaFinalMinutos.toString();
	horaFinalTexto = horaFinalTexto.padStart(2, "0");
	
	let horaInicioCompleta = horaActualHoras + ":" + horaInicioTexto;
	let horaFinalCompleta = horaFinalHoras + ":" + horaFinalTexto;
	
	if(bloque.tipo === "estudio"){
		 	
		// Se crea el bloque visual dentro del horario //
		let bloqueVisual = document.createElement("div");
		bloqueVisual.textContent = horaInicioCompleta + " - " + horaFinalCompleta + " | " + bloque.asignatura;
		bloqueVisual.classList.add("bloqueEstudio"); // Se llama al diseño del CSS //
		bloqueVisual.style.backgroundColor = colorEstudio;
		horarioVisual.appendChild(bloqueVisual);
	}
	
	if(bloque.tipo === "descanso"){
    
		// Se crea el bloque visual dentro del horario //
		let bloqueVisual = document.createElement("div");
		bloqueVisual.textContent = horaInicioCompleta + " - " + horaFinalCompleta + " | " + "Descanso";
		bloqueVisual.classList.add("bloqueDescanso");
		bloqueVisual.style.backgroundColor = colorDescanso;
		horarioVisual.appendChild(bloqueVisual);
	}
	
	if(bloque.tipo === "tarea"){
    
		// Se crea el bloque visual dentro del horario //
		let bloqueVisual = document.createElement("div");
		bloqueVisual.textContent = horaInicioCompleta + " - " + horaFinalCompleta + " | " + bloque.tarea;
		bloqueVisual.classList.add("bloqueTarea");
		bloqueVisual.style.backgroundColor = colorTareas;
		horarioVisual.appendChild(bloqueVisual);
	}
	
	// Se actualiza la hora actual para que sea la hora final del bloque anterior //
	minutosActuales = minutosFinales;
}

console.log(horario);

// ==========================================
// RECUPERAR CONFIGURACIÓN
// ==========================================

let colorFondoGuardado = localStorage.getItem("colorFondo");
if(colorFondoGuardado !== null){
    document.body.style.backgroundColor = colorFondoGuardado;
}

let colorBotonesGuardado = localStorage.getItem("colorBotones");
if(colorBotonesGuardado !== null){
    let botones = document.querySelectorAll("button");
    botones.forEach(function(boton){
        boton.style.backgroundColor = colorBotonesGuardado;
    });
}

let tipoLetraGuardado = localStorage.getItem("tipoLetra");
if(tipoLetraGuardado !== null){
    document.body.style.fontFamily = tipoLetraGuardado;
}

let tamanoLetraGuardado = localStorage.getItem("tamanoLetra");
if(tamanoLetraGuardado !== null){
    if(tamanoLetraGuardado === "Pequeño"){
        document.body.style.fontSize = "14px";
    }
    if(tamanoLetraGuardado === "Normal"){
        document.body.style.fontSize = "16px";
    }
    if(tamanoLetraGuardado === "Grande"){
        document.body.style.fontSize = "20px";
    }
    if(tamanoLetraGuardado === "Muy grande"){
        document.body.style.fontSize = "24px";
    }
}

let estiloEsquinasGuardado = localStorage.getItem("estiloEsquinas");
if(estiloEsquinasGuardado !== null){
    let elementos = document.querySelectorAll("button, section, .menu, .contenedorHorario, .bloqueEstudio, .bloqueDescanso, .bloqueTarea");
    if(estiloEsquinasGuardado === "Sin redondeo"){
        elementos.forEach(function(elemento){
            elemento.style.borderRadius = "0px";
        });
    }
    if(estiloEsquinasGuardado === "Poco redondeadas"){
        elementos.forEach(function(elemento){
            elemento.style.borderRadius = "5px";
        });
    }
    if(estiloEsquinasGuardado === "Redondeadas"){
        elementos.forEach(function(elemento){
            elemento.style.borderRadius = "10px";
        });
    }
    if(estiloEsquinasGuardado === "Muy redondeadas"){
        elementos.forEach(function(elemento){
            elemento.style.borderRadius = "20px";
        });
    }
}

let colorCuadrosGuardado = localStorage.getItem("colorCuadros");
if(colorCuadrosGuardado !== null){
    document.querySelectorAll(".contenedorHorario").forEach(function(elemento){
        elemento.style.backgroundColor = colorCuadrosGuardado;
    });
}