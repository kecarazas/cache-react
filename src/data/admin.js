
const CLAVE_SESION = "at_sesion";
const CLAVE_USUARIOS = "at_usuarios";
const CLAVE_PRODUCTOS = "at_productos";

// ================================
// CATEGORÍAS GAMER
// ================================

export const CATEGORIAS = [
  { slug: "mouse", nombre: "Mouse Gamer" },
  { slug: "teclados", nombre: "Teclados Gamer" },
  { slug: "audifonos", nombre: "Audífonos Gamer" },
  { slug: "teclados-mouse", nombre: "Combos Teclado y Mouse" },
  { slug: "monitores", nombre: "Monitores Gamer" },
  { slug: "alfombrillas", nombre: "Alfombrillas" },
  { slug: "microfonos", nombre: "Micrófonos" },
  { slug: "accesorios", nombre: "Accesorios Gamer" },
];

export function nombreCategoria(slug) {
  return (
    CATEGORIAS.find((categoria) => categoria.slug === slug)?.nombre ||
    slug ||
    "-"
  );
}

// ================================
// SESIÓN
// ================================

export function obtenerSesion() {
  try {
    const guardado = localStorage.getItem(CLAVE_SESION);
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}

export function iniciarSesion(usuario) {
  const sesion = {
    run: usuario.run,
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    correo: usuario.correo,
    tipoUsuario: usuario.tipoUsuario,
  };

  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

// ================================
// USUARIOS DE PRUEBA
// ================================

const USUARIOS_SEMILLA = [
  {
    run: "111111111",
    nombre: "Administrador",
    apellidos: "Art Tools",
    correo: "admin@arttools.cl",
    clave: "admin123",
    fechaNacimiento: "1990-01-01",
    tipoUsuario: "administrador",
    region: "Región Metropolitana de Santiago",
    comuna: "Santiago",
    direccion: "Av. Siempre Viva 123",
  },
  {
    run: "222222222",
    nombre: "Vendedor",
    apellidos: "Art Tools",
    correo: "vendedor@arttools.cl",
    clave: "vendedor123",
    fechaNacimiento: "1995-05-05",
    tipoUsuario: "vendedor",
    region: "Región Metropolitana de Santiago",
    comuna: "Maipú",
    direccion: "Calle Falsa 456",
  },
];

export function obtenerUsuarios() {
  const guardado = localStorage.getItem(CLAVE_USUARIOS);

  if (!guardado) {
    guardarUsuarios(USUARIOS_SEMILLA);
    return [...USUARIOS_SEMILLA];
  }

  try {
    const usuarios = JSON.parse(guardado);

    if (Array.isArray(usuarios)) {
      return usuarios;
    }

    guardarUsuarios(USUARIOS_SEMILLA);
    return [...USUARIOS_SEMILLA];
  } catch {
    guardarUsuarios(USUARIOS_SEMILLA);
    return [...USUARIOS_SEMILLA];
  }
}

export function guardarUsuarios(lista) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
}

export function obtenerUsuarioPorCorreo(correo) {
  return (
    obtenerUsuarios().find(
      (usuario) =>
        usuario.correo.toLowerCase() ===
        (correo || "").toLowerCase()
    ) || null
  );
}

export function obtenerUsuarioPorRun(run) {
  return (
    obtenerUsuarios().find(
      (usuario) =>
        usuario.run.toUpperCase() ===
        (run || "").toUpperCase()
    ) || null
  );
}

export function crearUsuario(usuario) {
  const lista = obtenerUsuarios();

  const correoExiste = lista.some(
    (u) =>
      u.correo.toLowerCase() ===
      usuario.correo.toLowerCase()
  );

  if (correoExiste) {
    return {
      ok: false,
      error: "Ya existe una cuenta con ese correo.",
    };
  }

  const runExiste = lista.some(
    (u) =>
      u.run.toUpperCase() === usuario.run.toUpperCase()
  );

  if (runExiste) {
    return {
      ok: false,
      error: "Ya existe una cuenta con ese RUN.",
    };
  }

  guardarUsuarios([...lista, usuario]);

  return { ok: true };
}

export function actualizarUsuario(correoOriginal, datosNuevos) {
  const lista = obtenerUsuarios();

  const indice = lista.findIndex(
    (usuario) => usuario.correo === correoOriginal
  );

  if (indice === -1) {
    return false;
  }

  const correoDuplicado = lista.some(
    (usuario, i) =>
      i !== indice &&
      usuario.correo.toLowerCase() ===
        datosNuevos.correo.toLowerCase()
  );

  if (correoDuplicado) {
    return false;
  }

  lista[indice] = datosNuevos;
  guardarUsuarios(lista);

  return true;
}

export function eliminarUsuario(correo) {
  guardarUsuarios(
    obtenerUsuarios().filter(
      (usuario) => usuario.correo !== correo
    )
  );
}

// ================================
// CATÁLOGO INICIAL GAMER
// ================================

const PRODUCTOS_SEMILLA = [
  {
    codigo: "MOU-001",
    nombre: "Mouse Gamer Logitech G502 HERO",
    descripcion:
      "Mouse gamer con sensor de alta precisión, botones programables y peso ajustable.",
    precio: 39990,
    stock: 20,
    stockCritico: 5,
    categoria: "mouse",
    imagen: "/images/mouse/mouse1.png",
    destacado: true,
  },
  {
    codigo: "TEC-001",
    nombre: "Teclado Mecánico Redragon Kumara",
    descripcion:
      "Teclado mecánico compacto con iluminación y teclas diseñadas para gaming.",
    precio: 44990,
    stock: 15,
    stockCritico: 4,
    categoria: "teclados",
    imagen: "/images/teclados/teclado1.png",
    destacado: true,
  },
  {
    codigo: "AUD-001",
    nombre: "Audífonos Gamer HyperX Cloud II",
    descripcion:
      "Audífonos para gaming con sonido envolvente y micrófono integrado.",
    precio: 69990,
    stock: 12,
    stockCritico: 3,
    categoria: "audifonos",
    imagen: "/images/audifonos/audifonos1.png",
    destacado: true,
  },
  {
    codigo: "ALF-001",
    nombre: "Alfombrilla Gamer XL",
    descripcion:
      "Alfombrilla de gran tamaño con superficie optimizada para el movimiento del mouse.",
    precio: 14990,
    stock: 30,
    stockCritico: 5,
    categoria: "alfombrillas",
    imagen: "/images/mousePad/mousePad1.png",
    destacado: false,
  }
];

// ================================
// FUNCIONES DE PRODUCTOS
// ================================

export function obtenerProductos() {
  const guardado = localStorage.getItem(CLAVE_PRODUCTOS);

  if (!guardado) {
    guardarProductos(PRODUCTOS_SEMILLA);
    return [...PRODUCTOS_SEMILLA];
  }

  try {
    const productos = JSON.parse(guardado);

    if (Array.isArray(productos)) {
      return productos;
    }

    guardarProductos(PRODUCTOS_SEMILLA);
    return [...PRODUCTOS_SEMILLA];
  } catch {
    guardarProductos(PRODUCTOS_SEMILLA);
    return [...PRODUCTOS_SEMILLA];
  }
}

export function guardarProductos(lista) {
  localStorage.setItem(
    CLAVE_PRODUCTOS,
    JSON.stringify(lista)
  );
}

export function obtenerProductoPorCodigo(codigo) {
  return (
    obtenerProductos().find(
      (producto) => producto.codigo === codigo
    ) || null
  );
}

export function crearProducto(producto) {
  const lista = obtenerProductos();

  const codigoExiste = lista.some(
    (p) =>
      p.codigo.toLowerCase() ===
      producto.codigo.toLowerCase()
  );

  if (codigoExiste) {
    return false;
  }

  guardarProductos([...lista, producto]);

  return true;
}

export function actualizarProducto(codigoOriginal, datosNuevos) {
  const lista = obtenerProductos();

  const indice = lista.findIndex(
    (producto) => producto.codigo === codigoOriginal
  );

  if (indice === -1) {
    return false;
  }

  const codigoDuplicado = lista.some(
    (producto, i) =>
      i !== indice &&
      producto.codigo.toLowerCase() ===
        datosNuevos.codigo.toLowerCase()
  );

  if (codigoDuplicado) {
    return false;
  }

  lista[indice] = datosNuevos;
  guardarProductos(lista);

  return true;
}

export function eliminarProducto(codigo) {
  guardarProductos(
    obtenerProductos().filter(
      (producto) => producto.codigo !== codigo
    )
  );
}

// ================================
// FORMATO DE PRECIOS CHILENOS
// ================================

export function formatCLP(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);
}
