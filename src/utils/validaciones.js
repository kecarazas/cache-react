
export function validarRun(run) {
  if (!/^[0-9kK]{7,9}$/.test(run)) return false;

  let suma = 0;
  let multiplicador = 2;
  const cuerpo = run.slice(0, -1);
  const digito = run.slice(-1).toUpperCase();

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  const dv = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

  return dv === digito;
}

export function validarDominioCorreo(correo) {
  return /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo);
}