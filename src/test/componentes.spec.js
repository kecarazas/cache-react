import React , {act} from "react";
import {createRoot} from "react-dom/client";

import {
  ListaProductos,
  MensajeError,
  Boton,
  FormularioNombre,
  Contador
} from "../components/pruebas/ComponentesPrueba";

const h = React.createElement;
describe("Pruebas de componentes", () => {
    let contenedor;
    let root;
    let entornoActAnterior;

    beforeEach(() => {
        entornoActAnterior = globalThis.IS_REACT_ACT_ENVIRONMENT;

        globalThis.IS_REACT_ACT_ENVIRONMENT = true;

        contenedor = document.createElement("div");
        document.body.appendChild(contenedor);

        root = createRoot(contenedor);
    });

    afterEach(async () => {
        await act(async () => {
            root.unmount();
        });

        contenedor.remove();

        globalThis.IS_REACT_ACT_ENVIRONMENT = entornoActAnterior;
    });

    async function renderizar(elemento) {
        await act(async() => {
            root.render(elemento);
        });
    }

    describe("Renderizado de listas", () => {
        it("renderiza todos los productos recibidos", async () => {
            const productos = [
                {
                    slug: "mouse-1",
                    nombre: "Mouse Gamer"
                },
                {
                    slug: "teclado-1",
                    nombre: "Teclado Mecánico"   
                },
                {
                    slug: "mousepad-1",
                    nombre: "Mousepad XL"
                }
            ];

            await renderizar(
                h(ListaProductos, {productos})
            );

            const elementos = contenedor.querySelectorAll("li");

            const nombres = Array.from(
                elementos,
                (elemento) => elemento.textContent
            );

            expect(elementos.length).toBe(productos.length);

            expect(nombres).toEqual(
                productos.map((producto) => producto.nombre)
            );
        });

        it("no renderiza elementos si la lista esta vacia", async () => {
            await renderizar(
                h(ListaProductos, {productos: []})
            );

            expect(
                contenedor.querySelectorAll("li").length
            ).toBe(0);
        });
    });

    describe("Renderizado condicional", () => {
        it("muestra el error y lo oculta cuando se corrige", async () =>{
            await renderizar(
                h(MensajeError, {
                    error: "El correo es obligatorio."
                })
            );

            const mensaje = contenedor.querySelector('[role="alert"]');
            expect(mensaje).not.toBeNull();

            expect(mensaje.textContent).toBe(
                "El correo es obligatorio."
            );

            await renderizar(
                h(MensajeError, {error: ""})
            );

            expect(
                contenedor.querySelector('[role="alert"]')
            ).toBeNull();
        });
    });

    describe("Props del botón", () => {
        it("Muestra la etiqueta recibida", async() =>{
            await renderizar(
                h(
                    Boton, {
                        etiqueta: "Agregar al carrito",
                        onClick: () => {}
                    }
                )
            );

            expect(contenedor.querySelector("button").textContent).toBe("Agregar al carrito");
        });

        it("ejecuta el onClick recibido al hacer clic", async () => {
        const manejarClick =
            jasmine.createSpy("manejarClick");

        await renderizar(
            h(Boton, {
            etiqueta: "Registrar",
            onClick: manejarClick
            })
        );

        expect(manejarClick).not.toHaveBeenCalled();

        await act(async () => {
            contenedor.querySelector("button").click();
        });

        expect(manejarClick).toHaveBeenCalledTimes(1);
        });
    });

    describe("Estado del formulario", () => {
        it("actualiza el estado cuando el usuario escribe", async() =>{
            await renderizar(
                h(FormularioNombre)
            );

            const input = contenedor.querySelector('input[name="nombre"]');

            const salida = contenedor.querySelector( '[data-testid="nombre-actual"]');
            
            expect(input.value).toBe("");
            expect(salida.textContent).toBe(
                "Nombre ingresado: "
            );

            const establecerValor = Object.getOwnPropertyDescriptor(
                HTMLInputElement.prototype, "value"
            ).set;

            await act(async () => {
                establecerValor.call(input, "Ash");

                input.dispatchEvent(
                    new Event("input", {bubbles: true})
                );
            });

            expect(input.value).toBe("Ash");

            expect(salida.textContent).toBe("Nombre ingresado: Ash");
        });
    });

    describe("Eventos y cambios de estado", () => {
        it("aumenta el contenedor al hacer clic", async () => {
            await renderizar(
                h(Contador)
            );

            const cantidad = contenedor.querySelector('[data-testid="cantidad"]');

            const boton = contenedor.querySelector("button");

            expect(cantidad.textContent).toBe("Cantidad: 0");

            await act(async() =>{
                boton.click();
            });

            expect(cantidad.textContent).toBe("Cantidad: 1");

            await act(async() => {
                boton.click();
            });

            expect(cantidad.textContent).toBe(
                "Cantidad: 2"
            );
        });
    });
});
