
const comprobante = document.getElementById('comprobante');
const inputs = document.querySelectorAll('#comprobante input');

const expresiones = {

    manzana: /^\d{1,5}$/, // 1 a 5 numeros.
    villa: /^\d{1,6}$/, // 	1 a 6 numeros.
	tramite: /^\d{1,9}$/, // 1 a 6 numeros.
	banco: /^[a-zA-Z]+$/, // Letras, numeros, guion y guion_bajo
	fecha: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/, // Para Fecha
	pago: /^\d{1,9}$/, // 1 a 9 numeros.

}


const campos = {
    manzana: false,
    villa: false,
	tramite: false,
	banco: false,
	fecha: false,
	pago: false
}

const validarcomprobante = (e) => {
	switch (e.target.name) {
        case "manzana":
			validarCampo(expresiones.manzana, e.target, 'manzana');
		break;
        case "villa":
			validarCampo(expresiones.villa, e.target, 'villa');
		break;
		case "tramite":
			validarCampo(expresiones.tramite, e.target, 'tramite');
		break;
		case "banco":
			validarCampo(expresiones.banco, e.target, 'banco');
		break;
		case "fecha":
			validarCampo(expresiones.fecha, e.target, 'fecha');
		break;
		case "pago":
		validarCampo(expresiones.pago, e.target, 'pago');
	break;
	}
}


const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('comprobante__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('comprobante__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .comprobante__input-error`).classList.remove('comprobante__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('comprobante__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('comprobante__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .comprobante__input-error`).classList.add('comprobante__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarcomprobante);
	input.addEventListener('blur', validarcomprobante);
});


comprobante.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.manzana && campos.villa && campos.tramite  && campos.banco && campos.fecha && campos.pago){
		comprobante.reset();

		document.getElementById('comprobante__mensaje-exito').classList.add('comprobante__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('comprobante__mensaje-exito').classList.remove('comprobante__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.comprobante__grupo-correcto').forEach((icono) => {
			icono.classList.remove('comprobante__grupo-correcto');
		});
		document.getElementById('comprobante__mensaje').classList.remove('comprobante__mensaje-activo');
	} else {
		document.getElementById('comprobante__mensaje').classList.add('comprobante__mensaje-activo');
	}
});
