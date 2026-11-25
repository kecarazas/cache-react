// Los datos de usuarios, productos y sesión ahora viven en el backend (src/services).
// Aquí solo queda el formato CLP.
export function formatCLP(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);
}