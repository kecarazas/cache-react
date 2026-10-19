
import { useState } from "react";
import "./FiltroSidebar.css";

function FiltroSidebar() {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState({
    disponibilidad: true,
    precio: true,
    color: true,
    polling: true
  });

  const [precioMaximo, setPrecioMaximo] = useState(250000);
  const [coloresSeleccionados, setColoresSeleccionados] = useState([]);
  const [pollingSeleccionado, setPollingSeleccionado] = useState([]);

  const colores = [
    { nombre: "Negro", valor: "#171717" },
    { nombre: "Blanco", valor: "#f5f5f5" },
    { nombre: "Rojo", valor: "#d62828" },
    { nombre: "Azul", valor: "#2471a3" },
    { nombre: "Rosado", valor: "#e78ac3" },
    { nombre: "Verde", valor: "#239b56" },
    { nombre: "Morado", valor: "#884ea0" },
    { nombre: "Gris", valor: "#808080" },
    { nombre: "Amarillo", valor: "#f4d03f" },
    { nombre: "Multicolor", valor: "multicolor" }
  ];

  const cambiarFiltro = (filtro) => {
    setFiltrosAbiertos((anterior) => ({
      ...anterior,
      [filtro]: !anterior[filtro]
    }));
  };

  const alternarColor = (color) => {
    setColoresSeleccionados((anterior) =>
      anterior.includes(color)
        ? anterior.filter((c) => c !== color)
        : [...anterior, color]
    );
  };

  const alternarPolling = (valor) => {
    setPollingSeleccionado((anterior) =>
      anterior.includes(valor)
        ? anterior.filter((p) => p !== valor)
        : [...anterior, valor]
    );
  };

  const encabezadoFiltro = (titulo, clave) => (
    <button
      type="button"
      className={`filtro-header ${
        filtrosAbiertos[clave] ? "" : "colapsado"
      }`}
      onClick={() => cambiarFiltro(clave)}
      aria-expanded={filtrosAbiertos[clave]}
    >
      {titulo}
      <span className="filtro-flecha">▼</span>
    </button>
  );

  return (
    <aside className="filtros-sidebar">
      <h2 className="filtros-titulo">Filtros</h2>

      {/* Disponibilidad */}
      <div className="filtro-grupo">
        {encabezadoFiltro("Disponibilidad", "disponibilidad")}

        <div
          className={`filtro-contenido ${
            filtrosAbiertos.disponibilidad ? "" : "oculto"
          }`}
        >
          <label className="filtro-check">
            <input type="checkbox" />
            En stock
          </label>

          <label className="filtro-check">
            <input type="checkbox" />
            Agotado
          </label>
        </div>
      </div>

      {/* Precio */}
      <div className="filtro-grupo">
        {encabezadoFiltro("Precio", "precio")}

        <div
          className={`filtro-contenido ${
            filtrosAbiertos.precio ? "" : "oculto"
          }`}
        >
          <p className="precio-max-texto">
            Precio máximo: ${precioMaximo.toLocaleString("es-CL")}
          </p>

          <input
            type="range"
            className="rango-precio"
            min="0"
            max="250000"
            step="5000"
            value={precioMaximo}
            onChange={(e) =>
              setPrecioMaximo(Number(e.target.value))
            }
          />

          <div className="precio-min-max">
            <span>$0</span>
            <span>$250.000</span>
          </div>
        </div>
      </div>

      {/* Color */}
      <div className="filtro-grupo">
        {encabezadoFiltro("Color", "color")}

        <div
          className={`filtro-contenido ${
            filtrosAbiertos.color ? "" : "oculto"
          }`}
        >
          <div className="color-grid">
            {colores.map((color) => (
              <button
                key={color.nombre}
                type="button"
                className={`color-swatch ${
                  color.valor === "multicolor" ? "multicolor" : ""
                }`}
                style={
                  color.valor !== "multicolor"
                    ? { backgroundColor: color.valor }
                    : undefined
                }
                title={color.nombre}
                aria-label={color.nombre}
                aria-pressed={coloresSeleccionados.includes(
                  color.nombre
                )}
                onClick={() => alternarColor(color.nombre)}
              >
                {coloresSeleccionados.includes(color.nombre) && "✓"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Polling rate */}
      <div className="filtro-grupo">
        {encabezadoFiltro("Polling Rate", "polling")}

        <div
          className={`filtro-contenido ${
            filtrosAbiertos.polling ? "" : "oculto"
          }`}
        >
          {["125 Hz", "500 Hz", "1000 Hz", "4000 Hz", "8000 Hz"].map(
            (valor) => (
              <label className="filtro-check" key={valor}>
                <input
                  type="checkbox"
                  checked={pollingSeleccionado.includes(valor)}
                  onChange={() => alternarPolling(valor)}
                />
                {valor}
              </label>
            )
          )}
        </div>
      </div>
    </aside>
  );
}

export default FiltroSidebar;
