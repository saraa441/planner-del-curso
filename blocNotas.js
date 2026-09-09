// ===============================
// BLOC DE NOTAS
// ===============================


// ===============================
// ELEMENTOS PRINCIPALES
// ===============================

const botonBlocNotas =
	document.getElementById("btnBlocNotas");

const blocNotas =
	document.getElementById("blocNotas");

const menuNotas =
	document.getElementById("menuPrincipal");

const btnInicioBlocNotas =
	document.getElementById("btnInicioBlocNotas");


// ===============================
// DATOS DE LAS NOTAS
// ===============================

let notas = [];

let portadaSeleccionada = null;

let estiloNotaSeleccionado = "clasico";

let notaActual = null;

let paginaActual = 0;

let cambiandoPortada = false;


// ===============================
// GUARDAR NOTAS EN LOCALSTORAGE
// ===============================

function guardarNotas() {

	localStorage.setItem(
		"plannerNotas",
		JSON.stringify(notas)
	);

}


// ===============================
// CARGAR NOTAS
// ===============================

function cargarNotas() {

	const datosGuardados =
		localStorage.getItem("plannerNotas");


	if (datosGuardados) {

		try {

			notas = JSON.parse(datosGuardados);

		}

		catch (error) {

			notas = [];

		}

	}

	else {

		notas = [];

	}


	mostrarNotas();

}


// ===============================
// ABRIR BLOC DE NOTAS
// ===============================

botonBlocNotas.onclick = function() {

	menuNotas.style.display = "none";

	blocNotas.style.display = "block";

	mostrarNotas();

};


// ===============================
// VOLVER AL INICIO
// ===============================

btnInicioBlocNotas.onclick = function() {

	blocNotas.style.display = "none";

	menuNotas.style.display = "block";

};


// ===============================
// CAMBIAR TÍTULO DE LA NOTA
// ===============================

const btnCambiarTitulo =
	document.getElementById("btnCambiarTitulo");


btnCambiarTitulo.onclick = function() {

	if (!notaActual) {

		return;

	}


	const nuevoTitulo =
		prompt(
			"Escribe el nuevo título:",
			notaActual.titulo
		);


	if (
		nuevoTitulo !== null &&
		nuevoTitulo.trim() !== ""
	) {

		notaActual.titulo =
			nuevoTitulo.trim();


		document.getElementById(
			"tituloNotaIndividual"
		).textContent =
			notaActual.titulo;


		guardarNotas();

	}

};


// ===============================
// MOSTRAR TODAS LAS NOTAS
// ===============================

function mostrarNotas() {

	const contenedorNotas =
		document.getElementById("contenedorNotas");


	if (!contenedorNotas) {

		return;

	}


	contenedorNotas.innerHTML = "";


	notas.forEach(function(nota) {

		crearElementoNota(nota);

	});

}


// ===============================
// CREAR ELEMENTO VISUAL DE UNA NOTA
// ===============================

function crearElementoNota(nota) {

	const contenedorNotas =
		document.getElementById("contenedorNotas");


	const elementoNota =
		document.createElement("div");


	elementoNota.className =
		"nota";


	// ===============================
	// CREAR PORTADA
	// ===============================

	const portadaElemento =
		document.createElement("div");


	portadaElemento.className =
		"portadaNota";


	portadaElemento.style.position =
		"absolute";

	portadaElemento.style.top =
		"0";

	portadaElemento.style.left =
		"0";

	portadaElemento.style.right =
		"0";

	portadaElemento.style.bottom =
		"0";

	portadaElemento.style.width =
		"100%";

	portadaElemento.style.height =
		"100%";

	portadaElemento.style.margin =
		"0";

	portadaElemento.style.borderRadius =
		"10px";

	portadaElemento.style.zIndex =
		"0";


	// ===============================
	// APLICAR PORTADA
	// ===============================

	if (nota.portada) {

		if (
			nota.portada.tipo ===
			"color"
		) {

			portadaElemento.style.backgroundColor =
				nota.portada.color;

		}


		else if (
			nota.portada.tipo ===
			"dosColores"
		) {

			portadaElemento.style.background =
				"linear-gradient(90deg, " +
				nota.portada.color1 +
				", " +
				nota.portada.color2 +
				")";

		}


		else if (
			nota.portada.tipo ===
			"dibujo"
		) {

			portadaElemento.style.background =
				"linear-gradient(135deg, #FFF2B2, #FFD6E7)";


			portadaElemento.textContent =
				nota.portada.dibujo;


			portadaElemento.style.display =
				"flex";


			portadaElemento.style.alignItems =
				"center";


			portadaElemento.style.justifyContent =
				"center";


			portadaElemento.style.fontSize =
				"70px";

		}


		else if (
			nota.portada.tipo ===
			"personalizada"
		) {

			portadaElemento.style.backgroundImage =
				"url('" +
				nota.portada.imagen +
				"')";


			portadaElemento.style.backgroundSize =
				"cover";


			portadaElemento.style.backgroundPosition =
				"center";

		}

	}


	else {

		portadaElemento.style.display =
			"none";

	}


	// ===============================
	// CREAR TÍTULO
	// ===============================

	const tituloElemento =
		document.createElement("div");


	tituloElemento.className =
		"tituloNota";


	tituloElemento.textContent =
		nota.titulo;


	tituloElemento.style.position =
		"absolute";


	tituloElemento.style.bottom =
		"15px";


	tituloElemento.style.left =
		"50%";


	tituloElemento.style.transform =
		"translateX(-50%)";


	tituloElemento.style.width =
		"calc(100% - 20px)";


	tituloElemento.style.zIndex =
		"2";


	tituloElemento.style.textAlign =
		"center";


	tituloElemento.style.backgroundColor =
		"rgba(255, 255, 255, 0.75)";


	tituloElemento.style.borderRadius =
		"6px";


	tituloElemento.style.padding =
		"5px";


	tituloElemento.style.boxSizing =
		"border-box";


	// ===============================
	// BOTÓN ELIMINAR NOTA
	// ===============================

	const botonEliminarNota =
		document.createElement("button");


	botonEliminarNota.textContent =
		"🗑️";


	botonEliminarNota.className =
		"botonEliminarNota";


	botonEliminarNota.type =
		"button";


	botonEliminarNota.onclick =
		function(event) {

			event.preventDefault();

			event.stopPropagation();


			const confirmar =
				confirm(
					"¿Seguro que quieres eliminar esta nota?"
				);


			if (confirmar) {

				notas =
					notas.filter(
						function(n) {

							return n.id !== nota.id;

						}
					);


				guardarNotas();

				mostrarNotas();

			}

		};


	elementoNota.appendChild(
		botonEliminarNota
	);


	elementoNota.appendChild(
		portadaElemento
	);


	elementoNota.appendChild(
		tituloElemento
	);


	// ===============================
	// ABRIR NOTA
	// ===============================

	elementoNota.onclick = function() {

		abrirNota(nota);

	};


	contenedorNotas.appendChild(
		elementoNota
	);

}


// ===============================
// BOTÓN AÑADIR NUEVA NOTA
// ===============================

const btnNuevaNota =
	document.getElementById("btnNuevaNota");


btnNuevaNota.onclick = function(event) {

	event.stopPropagation();


	const opcionesExistentes =
		document.getElementById("opcionesNuevaNota");


	if (opcionesExistentes) {

		opcionesExistentes.remove();

		return;

	}


	const opcionesNuevaNota =
		document.createElement("div");


	opcionesNuevaNota.id =
		"opcionesNuevaNota";


	// ===============================
	// CREAR NOTA NUEVA
	// ===============================

	const btnCrearNota =
		document.createElement("button");


	btnCrearNota.id =
		"btnCrearNota";


	btnCrearNota.textContent =
		"Crear nota nueva";


	btnCrearNota.onclick = function(event) {

		event.stopPropagation();


		document
			.getElementById("opcionesNuevaNota")
			.remove();


		document
			.getElementById("contenedorNotas")
			.style.display =
				"none";


		document
			.getElementById("botonesNotas")
			.style.display =
				"none";


		document
			.getElementById("configuracionNota")
			.style.display =
				"block";

	};


	opcionesNuevaNota.appendChild(
		btnCrearNota
	);


	opcionesNuevaNota.onclick =
		function(event) {

			event.stopPropagation();

		};


	blocNotas.appendChild(
		opcionesNuevaNota
	);

};


// ===============================
// CERRAR OPCIONES DE NUEVA NOTA
// ===============================

document.addEventListener(
	"click",
	function() {

		const opcionesExistentes =
			document.getElementById(
				"opcionesNuevaNota"
			);


		if (opcionesExistentes) {

			opcionesExistentes.remove();

		}

	}
);


// ===============================
// SELECTOR DE PORTADAS
// ===============================

const btnAnadirPortada =
	document.getElementById(
		"btnAnadirPortada"
	);


const selectorPortadas =
	document.getElementById(
		"selectorPortadas"
	);


// Guardamos dónde estaba originalmente
// el selector para poder devolverlo.

let padreOriginalSelectorPortadas =
	null;

let siguienteElementoSelectorPortadas =
	null;


// ===============================
// CERRAR SELECTOR DE PORTADAS
// ===============================

function cerrarSelectorPortadas() {

	selectorPortadas.style.display =
		"none";


	// Si lo movimos al body para editar
	// una nota existente, lo devolvemos
	// a su sitio original.

	if (
		padreOriginalSelectorPortadas
	) {

		if (
			siguienteElementoSelectorPortadas &&
			siguienteElementoSelectorPortadas.parentNode ===
				padreOriginalSelectorPortadas
		) {

			padreOriginalSelectorPortadas.insertBefore(
				selectorPortadas,
				siguienteElementoSelectorPortadas
			);

		}

		else {

			padreOriginalSelectorPortadas.appendChild(
				selectorPortadas
			);

		}


		padreOriginalSelectorPortadas =
			null;


		siguienteElementoSelectorPortadas =
			null;

	}

}


// ===============================
// ABRIR SELECTOR DE PORTADAS
// ===============================

function abrirSelectorPortadas(
	editarNota
) {

	if (
		editarNota
	) {

		// Guardamos la posición original.

		padreOriginalSelectorPortadas =
			selectorPortadas.parentNode;


		siguienteElementoSelectorPortadas =
			selectorPortadas.nextSibling;


		// Lo sacamos de cualquier contenedor
		// que pueda estar oculto.

		document.body.appendChild(
			selectorPortadas
		);

	}


	mostrarOpcionesPortada();


	selectorPortadas.style.display =
		"block";

}


// ===============================
// APLICAR PORTADA SELECCIONADA
// ===============================

function aplicarPortadaSeleccionada(
	portada
) {

	if (
		cambiandoPortada &&
		notaActual
	) {

		// ===============================
		// CAMBIAR PORTADA EXISTENTE
		// ===============================

		notaActual.portada =
			portada;


		guardarNotas();


		// Actualizar la lista de notas.

		mostrarNotas();


		cambiandoPortada =
			false;


		portadaSeleccionada =
			null;


		cerrarSelectorPortadas();


		return;

	}


	// ===============================
	// PORTADA DE NOTA NUEVA
	// ===============================

	portadaSeleccionada =
		portada;


	cerrarSelectorPortadas();

}


// ===============================
// MOSTRAR OPCIONES DE PORTADA
// ===============================

function mostrarOpcionesPortada() {

	selectorPortadas.innerHTML =
		"<h3>Elige una portada</h3>";


	// ===============================
	// UN COLOR
	// ===============================

	const btnUnColor =
		document.createElement("button");


	btnUnColor.textContent =
		"🎨 Un color";


	selectorPortadas.appendChild(
		btnUnColor
	);


	btnUnColor.onclick =
		function(event) {

			event.stopPropagation();


			selectorPortadas.innerHTML =
				"<h3>Elige un color</h3>";


			const color =
				document.createElement("input");


			color.type =
				"color";


			color.value =
				"#6EA8E5";


			selectorPortadas.appendChild(
				color
			);


			const btnAceptar =
				document.createElement("button");


			btnAceptar.textContent =
				"Elegir";


			selectorPortadas.appendChild(
				btnAceptar
			);


			btnAceptar.onclick =
				function(event) {

					event.stopPropagation();


					aplicarPortadaSeleccionada({

						tipo:
							"color",

						color:
							color.value

					});

				};

		};


	// ===============================
	// DOS COLORES
	// ===============================

	const btnDosColores =
		document.createElement("button");


	btnDosColores.textContent =
		"🌈 Dos colores";


	selectorPortadas.appendChild(
		btnDosColores
	);


	btnDosColores.onclick =
		function(event) {

			event.stopPropagation();


			selectorPortadas.innerHTML =
				"<h3>Elige dos colores</h3>";


			const color1 =
				document.createElement("input");


			color1.type =
				"color";


			color1.value =
				"#6EA8E5";


			selectorPortadas.appendChild(
				color1
			);


			const color2 =
				document.createElement("input");


			color2.type =
				"color";


			color2.value =
				"#FFF2B2";


			selectorPortadas.appendChild(
				color2
			);


			const btnAceptar =
				document.createElement("button");


			btnAceptar.textContent =
				"Elegir";


			selectorPortadas.appendChild(
				btnAceptar
			);


			btnAceptar.onclick =
				function(event) {

					event.stopPropagation();


					aplicarPortadaSeleccionada({

						tipo:
							"dosColores",

						color1:
							color1.value,

						color2:
							color2.value

					});

				};

		};


	// ===============================
	// DIBUJOS
	// ===============================

	const btnDibujos =
		document.createElement("button");


	btnDibujos.textContent =
		"🖼️ Dibujos";


	selectorPortadas.appendChild(
		btnDibujos
	);


	btnDibujos.onclick =
		function(event) {

			event.stopPropagation();


			selectorPortadas.innerHTML =
				"<h3>Elige una portada</h3>";


			const dibujos = [

				"🌸",
				"⭐",
				"🌙",
				"🌈",
				"🌻",
				"☁️",
				"🍀",
				"🦋",
				"🌊",
				"🔥",
				"🍓",
				"🎵"

			];


			dibujos.forEach(
				function(dibujo) {

					const boton =
						document.createElement("button");


					boton.textContent =
						dibujo;


					boton.type =
						"button";


					boton.style.width =
						"70px";


					boton.style.height =
						"70px";


					boton.style.padding =
						"5px";


					boton.style.fontSize =
						"35px";


					boton.style.margin =
						"5px";


					selectorPortadas.appendChild(
						boton
					);


					boton.onclick =
						function(event) {

							event.stopPropagation();


							aplicarPortadaSeleccionada({

								tipo:
									"dibujo",

								dibujo:
									dibujo

							});

						};

				}
			);

		};


	// ===============================
	// PERSONALIZAR
	// ===============================

	const btnPersonalizar =
		document.createElement("button");


	btnPersonalizar.textContent =
		"📷 Personalizar";


	selectorPortadas.appendChild(
		btnPersonalizar
	);


	btnPersonalizar.onclick =
		function(event) {

			event.stopPropagation();


			selectorPortadas.innerHTML =
				"<h3>Elige una imagen</h3>";


			const archivo =
				document.createElement("input");


			archivo.type =
				"file";


			archivo.accept =
				"image/*";


			selectorPortadas.appendChild(
				archivo
			);


			archivo.onchange =
				function() {

					const imagen =
						archivo.files[0];


					if (!imagen) {

						return;

					}


					const lector =
						new FileReader();


					lector.onload =
						function(event) {

							aplicarPortadaSeleccionada({

								tipo:
									"personalizada",

								imagen:
									event.target.result

							});

						};


					lector.readAsDataURL(
						imagen
					);

				};

		};


	// ===============================
	// SIN PORTADA
	// ===============================

	const btnSinPortada =
		document.createElement("button");


	btnSinPortada.textContent =
		"❌ Sin portada";


	selectorPortadas.appendChild(
		btnSinPortada
	);


	btnSinPortada.onclick =
		function(event) {

			event.stopPropagation();


			aplicarPortadaSeleccionada(
				null
			);

		};

}


// ===============================
// AÑADIR PORTADA A NOTA NUEVA
// ===============================

btnAnadirPortada.onclick =
	function(event) {

		event.stopPropagation();


		cambiandoPortada =
			false;


		abrirSelectorPortadas(
			false
		);

	};


// ===============================
// CAMBIAR PORTADA DE NOTA EXISTENTE
// ===============================

const btnCambiarPortada =
	document.getElementById(
		"btnCambiarPortada"
	);
	
// ===============================
// CAMBIAR ESTILO DE LA NOTA
// ===============================

const btnCambiarEstilo =
	document.getElementById("btnCambiarEstilo");

const selectorEstiloNota =
	document.getElementById("selectorEstiloNota");

btnCambiarEstilo.onclick = function() {

	selectorEstiloNota.style.display =
		"block";

};

// ===============================
// OPCIONES DE ESTILO
// ===============================

const btnCambiarEstiloClasico =
	document.getElementById("btnCambiarEstiloClasico");

const btnCambiarEstiloRayas =
	document.getElementById("btnCambiarEstiloRayas");

const btnCambiarEstiloCuadros =
	document.getElementById("btnCambiarEstiloCuadros");

const btnCambiarEstiloPuntos =
	document.getElementById("btnCambiarEstiloPuntos");

const btnCerrarSelectorEstilo =
	document.getElementById("btnCerrarSelectorEstilo");

btnCambiarPortada.onclick =
	function(event) {

		event.preventDefault();

		event.stopPropagation();


		if (!notaActual) {

			return;

		}


		cambiandoPortada =
			true;


		abrirSelectorPortadas(
			true
		);

	};
	
// ===============================
// CAMBIAR ESTILO
// ===============================

btnCambiarEstiloClasico.onclick = function() {

	notaActual.estilo = "clasico";

	guardarNotas();

	selectorEstiloNota.style.display =
		"none";

	abrirNota(notaActual);

};


btnCambiarEstiloRayas.onclick = function() {

	notaActual.estilo = "rayas";

	guardarNotas();

	selectorEstiloNota.style.display =
		"none";

	abrirNota(notaActual);

};


btnCambiarEstiloCuadros.onclick = function() {

	notaActual.estilo = "cuadros";

	guardarNotas();

	selectorEstiloNota.style.display =
		"none";

	abrirNota(notaActual);

};


btnCambiarEstiloPuntos.onclick = function() {

	notaActual.estilo = "puntos";

	guardarNotas();

	selectorEstiloNota.style.display =
		"none";

	abrirNota(notaActual);

};


// ===============================
// CERRAR SELECTOR DE ESTILO
// ===============================

btnCerrarSelectorEstilo.onclick = function() {

	selectorEstiloNota.style.display =
		"none";

};

// ===============================
// SELECCIÓN DEL ESTILO
// ===============================

const btnEstiloClasico =
	document.getElementById(
		"btnEstiloClasico"
	);


const btnEstiloRayas =
	document.getElementById(
		"btnEstiloRayas"
	);


const btnEstiloCuadros =
	document.getElementById(
		"btnEstiloCuadros"
	);


const btnEstiloPuntos =
	document.getElementById(
		"btnEstiloPuntos"
	);


const cuadernoPrevia =
	document.getElementById(
		"cuadernoPrevia"
	);


// ===============================
// ESTILO CLÁSICO
// ===============================

btnEstiloClasico.onclick =
	function() {

		estiloNotaSeleccionado =
			"clasico";


		cuadernoPrevia.className =
			"estiloClasico";

	};


// ===============================
// ESTILO RAYAS
// ===============================

btnEstiloRayas.onclick =
	function() {

		estiloNotaSeleccionado =
			"rayas";


		cuadernoPrevia.className =
			"estiloRayas";

	};


// ===============================
// ESTILO CUADROS
// ===============================

btnEstiloCuadros.onclick =
	function() {

		estiloNotaSeleccionado =
			"cuadros";


		cuadernoPrevia.className =
			"estiloCuadros";

	};


// ===============================
// ESTILO PUNTOS
// ===============================

btnEstiloPuntos.onclick =
	function() {

		estiloNotaSeleccionado =
			"puntos";


		cuadernoPrevia.className =
			"estiloPuntos";

	};


// ===============================
// BOTÓN CANCELAR NOTA NUEVA
// ===============================

const btnCancelarNota =
	document.getElementById(
		"btnCancelarNota"
	);


btnCancelarNota.onclick =
	function() {

		document
			.getElementById(
				"configuracionNota"
			)
			.style.display =
				"none";


		document
			.getElementById(
				"contenedorNotas"
			)
			.style.display =
				"flex";


		document
			.getElementById(
				"botonesNotas"
			)
			.style.display =
				"flex";


		document
			.getElementById(
				"txtTituloNota"
			)
			.value =
				"";


		portadaSeleccionada =
			null;


		estiloNotaSeleccionado =
			"clasico";


		cuadernoPrevia.className =
			"estiloClasico";

	};


// ===============================
// BOTÓN GUARDAR NUEVA NOTA
// ===============================

const btnGuardarNota =
	document.getElementById(
		"btnGuardarNota"
	);


btnGuardarNota.onclick =
	function() {

		const titulo =
			document
				.getElementById(
					"txtTituloNota"
				)
				.value
				.trim();


		if (titulo === "") {

			alert(
				"Escribe un título para la nota."
			);


			return;

		}


		// ===============================
		// CREAR NOTA NORMAL
		// ===============================

		const nuevaNota = {

			id:
				Date.now().toString() +
				"-" +
				Math.random()
					.toString(36)
					.substring(2, 8),

			titulo:
				titulo,

			portada:
				portadaSeleccionada,

			estilo:
				estiloNotaSeleccionado,

			paginas:
				[""],

			elementos:
				[]

		};


		notas.push(
			nuevaNota
		);


		guardarNotas();


		// ===============================
		// LIMPIAR CONFIGURACIÓN
		// ===============================

		document
			.getElementById(
				"txtTituloNota"
			)
			.value =
				"";


		portadaSeleccionada =
			null;


		estiloNotaSeleccionado =
			"clasico";


		cuadernoPrevia.className =
			"estiloClasico";


		document
			.getElementById(
				"configuracionNota"
			)
			.style.display =
				"none";


		// ===============================
		// ABRIR AUTOMÁTICAMENTE
		// ===============================

		abrirNota(
			nuevaNota
		);

	};


// ===============================
// NOTA INDIVIDUAL
// ===============================

const notaIndividual =
	document.getElementById(
		"notaIndividual"
	);


const tituloNotaIndividual =
	document.getElementById(
		"tituloNotaIndividual"
	);


const hojasNota =
	document.getElementById(
		"hojasNota"
	);


const btnCerrarNota =
	document.getElementById(
		"btnCerrarNota"
	);


// ===============================
// CONTROLES DE PÁGINAS
// ===============================

const controlesPaginas =
	document.createElement("div");


controlesPaginas.id =
	"controlesPaginas";


const btnAnterior =
	document.createElement("button");


btnAnterior.textContent =
	"⬅️ Anterior";


btnAnterior.type =
	"button";


const indicadorPagina =
	document.createElement("span");


indicadorPagina.id =
	"indicadorPagina";


const btnSiguiente =
	document.createElement("button");


btnSiguiente.textContent =
	"Siguiente ➡️";


btnSiguiente.type =
	"button";


const btnNuevaHoja =
	document.createElement("button");


btnNuevaHoja.textContent =
	"➕ Nueva hoja";


btnNuevaHoja.type =
	"button";


controlesPaginas.appendChild(
	btnAnterior
);


controlesPaginas.appendChild(
	indicadorPagina
);


controlesPaginas.appendChild(
	btnSiguiente
);


controlesPaginas.appendChild(
	btnNuevaHoja
);


notaIndividual.insertBefore(
	controlesPaginas,
	hojasNota
);


// ===============================
// HERRAMIENTAS DE TEXTO
// ===============================

const btnNegrita =
	document.getElementById(
		"btnNegrita"
	);


const btnCursiva =
	document.getElementById(
		"btnCursiva"
	);


const btnSubrayado =
	document.getElementById(
		"btnSubrayado"
	);


const tamanoTexto =
	document.getElementById(
		"tamanoTexto"
	);


const tipoTexto =
	document.getElementById(
		"tipoTexto"
	);


const colorTexto =
	document.getElementById(
		"colorTexto"
	);


const btnIzquierda =
	document.getElementById(
		"btnIzquierda"
	);


const btnCentro =
	document.getElementById(
		"btnCentro"
	);


const btnDerecha =
	document.getElementById(
		"btnDerecha"
	);


const btnLista =
	document.getElementById(
		"btnLista"
	);


// ===============================
// BOTÓN AÑADIR ELEMENTO
// ===============================

const btnAnadirElemento =
	document.getElementById(
		"btnAnadirElemento"
	);


const menuElementos =
	document.getElementById(
		"menuElementos"
	);


btnAnadirElemento.onclick =
	function() {

		if (
			menuElementos.style.display ===
			"none"
		) {

			menuElementos.style.display =
				"block";

		}

		else {

			menuElementos.style.display =
				"none";

		}

	};


// ===============================
// FUNCIÓN PARA CREAR PAPELERA
// ===============================

function crearBotonEliminarImagen(
	contenedor
) {

	const botonEliminar =
		document.createElement("button");


	botonEliminar.textContent =
		"🗑️";


	botonEliminar.className =
		"botonEliminarImagen";


	botonEliminar.type =
		"button";


	botonEliminar.contentEditable =
		"false";


	botonEliminar.onclick =
		function(event) {

			event.preventDefault();

			event.stopPropagation();


			contenedor.remove();


			if (notaActual) {

				guardarPaginas();

			}

		};


	contenedor.appendChild(
		botonEliminar
	);

}


// ===============================
// AÑADIR IMAGEN
// ===============================

const btnAnadirImagen =
	document.getElementById(
		"btnAnadirImagen"
	);


btnAnadirImagen.onclick =
	function() {

		const archivo =
			document.createElement("input");


		archivo.type =
			"file";


		archivo.accept =
			"image/*";


		archivo.onchange =
			function() {

				const imagenSeleccionada =
					archivo.files[0];


				if (!imagenSeleccionada) {

					return;

				}


				const lector =
					new FileReader();


				lector.onload =
					function(event) {

						// ===============================
						// CREAR CONTENEDOR
						// ===============================

						const contenedorImagen =
							document.createElement("div");


						contenedorImagen.className =
							"contenedorImagen";


						contenedorImagen.style.left =
							"20px";


						contenedorImagen.style.top =
							"20px";


						contenedorImagen.contentEditable =
							"false";


						// ===============================
						// CREAR IMAGEN
						// ===============================

						const imagen =
							document.createElement("img");


						imagen.src =
							event.target.result;


						imagen.className =
							"imagenNota";


						imagen.draggable =
							false;


						imagen.contentEditable =
							"false";


						// ===============================
						// CALCULAR TAMAÑO INICIAL
						// ===============================

						imagen.onload =
							function() {

								const anchoInicial =
									200;


								let altoInicial =
									200;


								if (
									imagen.naturalWidth > 0 &&
									imagen.naturalHeight > 0
								) {

									altoInicial =
										anchoInicial *
										imagen.naturalHeight /
										imagen.naturalWidth;

								}


								contenedorImagen.style.width =
									anchoInicial + "px";


								contenedorImagen.style.height =
									altoInicial + "px";

							};


						// ===============================
						// CREAR CONTROLADORES
						// ===============================

						const controladores = [

							"esquinaSuperiorIzquierda",

							"ladoSuperior",

							"esquinaSuperiorDerecha",

							"ladoIzquierdo",

							"ladoDerecho",

							"esquinaInferiorIzquierda",

							"ladoInferior",

							"esquinaInferiorDerecha"

						];


						controladores.forEach(
							function(nombre) {

								const controlador =
									document.createElement("div");


								controlador.className =
									"controladorImagen " +
									nombre;


								controlador.contentEditable =
									"false";


								contenedorImagen.appendChild(
									controlador
								);

							}
						);


						// ===============================
						// CREAR PAPELERA
						// ===============================

						crearBotonEliminarImagen(
							contenedorImagen
						);


						// ===============================
						// COLOCAR IMAGEN
						// ===============================

						contenedorImagen.insertBefore(
							imagen,
							contenedorImagen.firstChild
						);


						// ===============================
						// BUSCAR HOJA ACTUAL
						// ===============================

						const hoja =
							document.querySelector(
								".hojaNota[style*='block']"
							);


						if (hoja) {

							hoja.appendChild(
								contenedorImagen
							);


							contenedorImagen.classList.add(
								"imagenSeleccionada"
							);


							guardarPaginas();

						}

					};


				lector.readAsDataURL(
					imagenSeleccionada
				);

			};


		archivo.click();

	};


// ===============================
// MOVER Y REDIMENSIONAR IMAGEN
// ===============================

let accionImagen = null;

let elementoImagenActivo = null;

let controladorActivo = null;

let desplazamientoX = 0;

let desplazamientoY = 0;

let inicioX = 0;

let inicioY = 0;

let inicioAncho = 0;

let inicioAlto = 0;

let inicioLeft = 0;

let inicioTop = 0;


// ===============================
// COMENZAR ACCIÓN
// ===============================

document.addEventListener(
	"pointerdown",
	function(event) {

		// ===============================
		// BUSCAR CONTROLADOR
		// ===============================

		const controlador =
			event.target.closest(
				".controladorImagen"
			);


		const contenedor =
			event.target.closest(
				".contenedorImagen"
			);


		// ===============================
		// REDIMENSIONAR
		// ===============================

		if (
			controlador &&
			contenedor
		) {

			accionImagen =
				"redimensionar";


			elementoImagenActivo =
				contenedor;


			controladorActivo =
				controlador;


			inicioX =
				event.clientX;


			inicioY =
				event.clientY;


			const posicion =
				contenedor.getBoundingClientRect();


			inicioAncho =
				posicion.width;


			inicioAlto =
				posicion.height;


			inicioLeft =
				contenedor.offsetLeft;


			inicioTop =
				contenedor.offsetTop;


			document
				.querySelectorAll(
					".contenedorImagen"
				)
				.forEach(
					function(elemento) {

						elemento.classList.remove(
							"imagenSeleccionada"
						);

					}
				);


			contenedor.classList.add(
				"imagenSeleccionada"
			);


			try {

				contenedor.setPointerCapture(
					event.pointerId
				);

			}

			catch (error) {

				// No hacer nada

			}


			event.preventDefault();

			event.stopPropagation();

			return;

		}


		// ===============================
		// MOVER IMAGEN
		// ===============================

		if (
			event.target.classList.contains(
				"imagenNota"
			)
		) {

			accionImagen =
				"mover";


			elementoImagenActivo =
				event.target.closest(
					".contenedorImagen"
				);


			if (!elementoImagenActivo) {

				return;

			}


			const posicion =
				elementoImagenActivo.getBoundingClientRect();


			desplazamientoX =
				event.clientX -
				posicion.left;


			desplazamientoY =
				event.clientY -
				posicion.top;


			document
				.querySelectorAll(
					".contenedorImagen"
				)
				.forEach(
					function(elemento) {

						elemento.classList.remove(
							"imagenSeleccionada"
						);

					}
				);


			elementoImagenActivo.classList.add(
				"imagenSeleccionada"
			);


			try {

				elementoImagenActivo.setPointerCapture(
					event.pointerId
				);

			}

			catch (error) {

				// No hacer nada

			}


			event.preventDefault();

			event.stopPropagation();

		}

	}
);


// ===============================
// MOVER O REDIMENSIONAR
// ===============================

document.addEventListener(
	"pointermove",
	function(event) {

		if (
			!accionImagen ||
			!elementoImagenActivo
		) {

			return;

		}


		const hoja =
			elementoImagenActivo.closest(
				".hojaNota"
			);


		if (!hoja) {

			return;

		}


		const posicionHoja =
			hoja.getBoundingClientRect();


		// ===============================
		// MOVER
		// ===============================

		if (
			accionImagen ===
			"mover"
		) {

			const nuevaX =
				event.clientX -
				posicionHoja.left -
				desplazamientoX;


			const nuevaY =
				event.clientY -
				posicionHoja.top -
				desplazamientoY;


			elementoImagenActivo.style.left =
				nuevaX + "px";


			elementoImagenActivo.style.top =
				nuevaY + "px";


			return;

		}


		// ===============================
		// REDIMENSIONAR
		// ===============================

		const dx =
			event.clientX -
			inicioX;


		const dy =
			event.clientY -
			inicioY;


		const nombreControlador =
			controladorActivo.className;


		let nuevoAncho =
			inicioAncho;


		let nuevoAlto =
			inicioAlto;


		let nuevoLeft =
			inicioLeft;


		let nuevoTop =
			inicioTop;


		// ===============================
		// ESQUINAS
		// ===============================

		if (
			nombreControlador.includes(
				"esquina"
			)
		) {

			const esIzquierda =
				nombreControlador.includes(
					"Izquierda"
				);


			const esDerecha =
				nombreControlador.includes(
					"Derecha"
				);


			const esSuperior =
				nombreControlador.includes(
					"Superior"
				);


			const esInferior =
				nombreControlador.includes(
					"Inferior"
				);


			const cambioAncho =
				esDerecha
					? dx
					: -dx;


			const cambioAlto =
				esInferior
					? dy
					: -dy;


			const escalaAncho =
				(inicioAncho + cambioAncho) /
				inicioAncho;


			const escalaAlto =
				(inicioAlto + cambioAlto) /
				inicioAlto;


			let escala;


			if (
				Math.abs(
					escalaAncho - 1
				) >
				Math.abs(
					escalaAlto - 1
				)
			) {

				escala =
					escalaAncho;

			}

			else {

				escala =
					escalaAlto;

			}


			const escalaMinima =
				Math.max(
					50 / inicioAncho,
					50 / inicioAlto
				);


			escala =
				Math.max(
					escala,
					escalaMinima
				);


			nuevoAncho =
				inicioAncho *
				escala;


			nuevoAlto =
				inicioAlto *
				escala;


			if (esIzquierda) {

				nuevoLeft =
					inicioLeft +
					inicioAncho -
					nuevoAncho;

			}


			if (esSuperior) {

				nuevoTop =
					inicioTop +
					inicioAlto -
					nuevoAlto;

			}

		}


		// ===============================
		// LADO IZQUIERDO
		// ===============================

		else if (
			nombreControlador.includes(
				"ladoIzquierdo"
			)
		) {

			nuevoAncho =
				Math.max(
					50,
					inicioAncho - dx
				);


			nuevoLeft =
				inicioLeft +
				inicioAncho -
				nuevoAncho;

		}


		// ===============================
		// LADO DERECHO
		// ===============================

		else if (
			nombreControlador.includes(
				"ladoDerecho"
			)
		) {

			nuevoAncho =
				Math.max(
					50,
					inicioAncho + dx
				);

		}


		// ===============================
		// LADO SUPERIOR
		// ===============================

		else if (
			nombreControlador.includes(
				"ladoSuperior"
			)
		) {

			nuevoAlto =
				Math.max(
					50,
					inicioAlto - dy
				);


			nuevoTop =
				inicioTop +
				inicioAlto -
				nuevoAlto;

		}


		// ===============================
		// LADO INFERIOR
		// ===============================

		else if (
			nombreControlador.includes(
				"ladoInferior"
			)
		) {

			nuevoAlto =
				Math.max(
					50,
					inicioAlto + dy
				);

		}


		// ===============================
		// APLICAR CAMBIOS
		// ===============================

		elementoImagenActivo.style.width =
			nuevoAncho + "px";


		elementoImagenActivo.style.height =
			nuevoAlto + "px";


		elementoImagenActivo.style.left =
			nuevoLeft + "px";


		elementoImagenActivo.style.top =
			nuevoTop + "px";

	}
);


// ===============================
// TERMINAR ACCIÓN
// ===============================

document.addEventListener(
	"pointerup",
	function(event) {

		if (!elementoImagenActivo) {

			return;

		}


		try {

			elementoImagenActivo.releasePointerCapture(
				event.pointerId
			);

		}

		catch (error) {

			// No hacer nada

		}


		// ===============================
		// GUARDAR CAMBIOS
		// ===============================

		if (notaActual) {

			guardarPaginas();

		}


		accionImagen =
			null;


		elementoImagenActivo =
			null;


		controladorActivo =
			null;

	}
);


// ===============================
// QUITAR SELECCIÓN
// ===============================

document.addEventListener(
	"pointerdown",
	function(event) {

		if (
			!event.target.closest(
				".contenedorImagen"
			)
		) {

			document
				.querySelectorAll(
					".contenedorImagen"
				)
				.forEach(
					function(elemento) {

						elemento.classList.remove(
							"imagenSeleccionada"
						);

					}
				);

		}

	}
);


// ===============================
// NEGRITA
// ===============================

btnNegrita.onclick =
	function() {

		document.execCommand(
			"bold"
		);

	};


// ===============================
// CURSIVA
// ===============================

btnCursiva.onclick =
	function() {

		document.execCommand(
			"italic"
		);

	};


// ===============================
// SUBRAYADO
// ===============================

btnSubrayado.onclick =
	function() {

		document.execCommand(
			"underline"
		);

	};


// ===============================
// TAMAÑO
// ===============================

tamanoTexto.onchange =
	function() {

		document.execCommand(
			"fontSize",
			false,
			tamanoTexto.value
		);

	};


// ===============================
// TIPO DE LETRA
// ===============================

tipoTexto.onchange =
	function() {

		document.execCommand(
			"fontName",
			false,
			tipoTexto.value
		);

	};


// ===============================
// COLOR
// ===============================

colorTexto.oninput =
	function() {

		document.execCommand(
			"foreColor",
			false,
			colorTexto.value
		);

	};


// ===============================
// ALINEACIÓN IZQUIERDA
// ===============================

btnIzquierda.onclick =
	function() {

		document.execCommand(
			"justifyLeft"
		);

	};


// ===============================
// ALINEACIÓN CENTRADA
// ===============================

btnCentro.onclick =
	function() {

		document.execCommand(
			"justifyCenter"
		);

	};


// ===============================
// ALINEACIÓN DERECHA
// ===============================

btnDerecha.onclick =
	function() {

		document.execCommand(
			"justifyRight"
		);

	};


// ===============================
// LISTA
// ===============================

btnLista.onclick =
	function() {

		document.execCommand(
			"insertUnorderedList"
		);

	};


// ===============================
// MOSTRAR PÁGINA
// ===============================

function mostrarPagina() {

	const hojas =
		document.querySelectorAll(
			".hojaNota"
		);


	hojas.forEach(
		function(hoja, indice) {

			if (
				indice ===
				paginaActual
			) {

				hoja.style.display =
					"block";

			}

			else {

				hoja.style.display =
					"none";

			}

		}
	);


	indicadorPagina.textContent =
		"Página " +
		(paginaActual + 1) +
		" de " +
		hojas.length;


	btnAnterior.disabled =
		paginaActual === 0;


	btnSiguiente.disabled =
		paginaActual ===
		hojas.length - 1;

}


// ===============================
// CONVERTIR IMÁGENES ANTIGUAS
// ===============================

function prepararImagenesAntiguas(
	hoja
) {

	const imagenes =
		hoja.querySelectorAll(
			"img.imagenNota"
		);


	imagenes.forEach(
		function(imagen) {

			if (
				imagen.parentElement &&
				imagen.parentElement.classList.contains(
					"contenedorImagen"
				)
			) {

				if (
					!imagen.parentElement.querySelector(
						".botonEliminarImagen"
					)
				) {

					crearBotonEliminarImagen(
						imagen.parentElement
					);

				}


				return;

			}


			// ===============================
			// CREAR CONTENEDOR
			// ===============================

			const contenedor =
				document.createElement("div");


			contenedor.className =
				"contenedorImagen";


			// ===============================
			// RECUPERAR POSICIÓN
			// ===============================

			if (imagen.style.left) {

				contenedor.style.left =
					imagen.style.left;

			}

			else {

				contenedor.style.left =
					"20px";

			}


			if (imagen.style.top) {

				contenedor.style.top =
					imagen.style.top;

			}

			else {

				contenedor.style.top =
					"20px";

			}


			// ===============================
			// RECUPERAR TAMAÑO
			// ===============================

			if (imagen.style.width) {

				contenedor.style.width =
					imagen.style.width;

			}

			else {

				contenedor.style.width =
					"200px";

			}


			if (imagen.style.height) {

				contenedor.style.height =
					imagen.style.height;

			}


			contenedor.contentEditable =
				"false";


			imagen.style.left =
				"";


			imagen.style.top =
				"";


			imagen.style.width =
				"";


			imagen.style.height =
				"";


			imagen.style.position =
				"";


			imagen.draggable =
				false;


			imagen.contentEditable =
				"false";


			// ===============================
			// CREAR CONTROLADORES
			// ===============================

			const controladores = [

				"esquinaSuperiorIzquierda",

				"ladoSuperior",

				"esquinaSuperiorDerecha",

				"ladoIzquierdo",

				"ladoDerecho",

				"esquinaInferiorIzquierda",

				"ladoInferior",

				"esquinaInferiorDerecha"

			];


			controladores.forEach(
				function(nombre) {

					const controlador =
						document.createElement("div");


					controlador.className =
						"controladorImagen " +
						nombre;


					controlador.contentEditable =
						"false";


					contenedor.appendChild(
						controlador
					);

				}
			);


			// ===============================
			// CREAR PAPELERA
			// ===============================

			crearBotonEliminarImagen(
				contenedor
			);


			// ===============================
			// SUSTITUIR IMAGEN ANTIGUA
			// ===============================

			imagen.parentNode.insertBefore(
				contenedor,
				imagen
			);


			contenedor.insertBefore(
				imagen,
				contenedor.firstChild
			);


			// ===============================
			// SI NO TENÍA ALTURA
			// ===============================

			if (
				!contenedor.style.height &&
				imagen.naturalWidth > 0
			) {

				contenedor.style.height =
					(
						parseFloat(
							contenedor.style.width
						) *
						imagen.naturalHeight /
						imagen.naturalWidth
					) + "px";

			}

		}
	);

}


// ===============================
// ABRIR NOTA
// ===============================

function abrirNota(nota) {

	notaActual =
		nota;


	// ===============================
	// COMPATIBILIDAD CON NOTAS ANTIGUAS
	// ===============================

	if (!nota.id) {

		nota.id =
			Date.now().toString() +
			"-" +
			Math.random()
				.toString(36)
				.substring(2, 8);

	}


	if (!nota.paginas) {

		nota.paginas = [
			nota.contenido || ""
		];

	}


	if (!nota.elementos) {

		nota.elementos = [];

	}


	guardarNotas();


	paginaActual =
		0;


	// ===============================
	// OCULTAR PANTALLAS
	// ===============================

	document
		.getElementById(
			"contenedorNotas"
		)
		.style.display =
			"none";


	document
		.getElementById(
			"botonesNotas"
		)
		.style.display =
			"none";


	document
		.getElementById(
			"configuracionNota"
		)
		.style.display =
			"none";


	// ===============================
	// MOSTRAR NOTA
	// ===============================

	notaIndividual.style.display =
		"block";


	tituloNotaIndividual.textContent =
		nota.titulo;


	// ===============================
	// CREAR HOJAS
	// ===============================

	hojasNota.innerHTML =
		"";


	nota.paginas.forEach(
		function(contenido) {

			const hoja =
				document.createElement("div");


			hoja.className =
				"hojaNota";


			hoja.contentEditable =
				"true";


			hoja.innerHTML =
				contenido;


			// ===============================
			// APLICAR ESTILO
			// ===============================

			if (nota.estilo) {

				hoja.classList.add(
					"notaEstilo" +
					nota.estilo.charAt(0).toUpperCase() +
					nota.estilo.slice(1)
				);

			}


			// ===============================
			// PREPARAR IMÁGENES
			// ===============================

			prepararImagenesAntiguas(
				hoja
			);


			hojasNota.appendChild(
				hoja
			);

		}
	);


	mostrarPagina();

}


// ===============================
// GUARDAR CONTENIDO DE LAS HOJAS
// ===============================

function guardarPaginas() {

	if (!notaActual) {

		return;

	}


	const hojas =
		document.querySelectorAll(
			".hojaNota"
		);


	notaActual.paginas =
		[];


	hojas.forEach(
		function(hoja) {

			const copiaHoja =
				hoja.cloneNode(true);


			copiaHoja
				.querySelectorAll(
					".contenedorImagen"
				)
				.forEach(
					function(imagen) {

						imagen.classList.remove(
							"imagenSeleccionada"
						);

					}
				);


			notaActual.paginas.push(
				copiaHoja.innerHTML
			);

		}
	);


	guardarNotas();

}


// ===============================
// GUARDADO AUTOMÁTICO
// ===============================

hojasNota.addEventListener(
	"input",
	function() {

		if (notaActual) {

			guardarPaginas();

		}

	}
);


// ===============================
// PÁGINA ANTERIOR
// ===============================

btnAnterior.onclick =
	function() {

		guardarPaginas();


		if (paginaActual > 0) {

			paginaActual--;


			mostrarPagina();

		}

	};


// ===============================
// PÁGINA SIGUIENTE
// ===============================

btnSiguiente.onclick =
	function() {

		guardarPaginas();


		if (
			paginaActual <
			notaActual.paginas.length - 1
		) {

			paginaActual++;


			mostrarPagina();

		}

	};


// ===============================
// NUEVA HOJA
// ===============================

btnNuevaHoja.onclick =
	function() {

		guardarPaginas();


		notaActual.paginas.push(
			""
		);


		const hoja =
			document.createElement("div");


		hoja.className =
			"hojaNota";


		hoja.contentEditable =
			"true";


		if (notaActual.estilo) {

			hoja.classList.add(
				"notaEstilo" +
				notaActual.estilo.charAt(0).toUpperCase() +
				notaActual.estilo.slice(1)
			);

		}


		hojasNota.appendChild(
			hoja
		);


		paginaActual =
			notaActual.paginas.length - 1;


		guardarNotas();


		mostrarPagina();


		hoja.focus();

	};


// ===============================
// GUARDAR AL SALIR
// ===============================

btnCerrarNota.onclick =
	function() {

		guardarPaginas();


		notaIndividual.style.display =
			"none";


		document
			.getElementById(
				"contenedorNotas"
			)
			.style.display =
				"flex";


		document
			.getElementById(
				"botonesNotas"
			)
			.style.display =
				"flex";


		notaActual =
			null;


		cambiandoPortada =
			false;


		mostrarNotas();

	};


// ===============================
// CARGAR NOTAS AL INICIAR
// ===============================

cargarNotas();