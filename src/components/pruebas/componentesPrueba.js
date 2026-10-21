import React, {useState} from "react";

const h = React.createElement;

export function ListaProductos({productos}){
    return h(
        "ul",
        {"aria-label": "Productos"},
        productos.map((producto) =>
            h(
                "li",
                {key: producto.slug},
                producto.nombre
            ))
    );
}

export function MensajeError({error}){
    if (!error) return null;

    return h(
        "p",
        {role: "alert"},
        error
    );
}

export function Boton({etiqueta, onClick}){
    return h(
        "button",
        {
            type: "button",
            onClick
        },
        etiqueta
    );
}

export function FormularioNombre(){
    const [nombre, setNombre] = useState("");

    return h(
        "form",
        {onSubmit: (evento) => evento.preventDefault()},

        h(
            "label",
            {htmlFor: "nombre-prueba"},
            "Nombre"
        ),

        h("input", {
            id: "nombre-prueba",
            name: "nombre",
            type: "text",
            valu: nombre,
            onChange: (evento) =>
                setNombre(evento.target.value)
        }),

        h(
            "p",
            {"data-testid": "nombre-actual"},
            `Nombre ingresado: ${nombre}`
        )
    );
}

export function Contador(){
    const [cantidad, setCantidad] = useState(0);

    return h(
        "div",
        null,

        h(
            "p",
            {"data-testid": "cantidad"},
            `Cantidad: ${cantidad}`
        ),

        h(
            Boton,
            {
                etiqueta: "Aumentar",
                onClick: () =>
                    setCantidad((anterior) => anterior +1)
            }
        )
    );
}