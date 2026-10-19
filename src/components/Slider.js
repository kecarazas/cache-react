import { useState, useEffect } from "react";
import "./Slider.css";

function Slider() {
    const [index, setIndex] = useState(0)

    const banners = [
        'images/estadarte1.png',
        'images/estandarte2.png',
        'images/estandarte3.png'
    ]

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndex((actual) => (actual + 1) % banners.length);
        }, 5000)

        return () => clearInterval(intervalo);
    }, [banners.length]);
    
    return (
        <section className="slider-container">
            <div className="slider" style={{ transform: `translateX(-${index * 100}%)` }}>

                {banners.map((imagen, i) => (
                    <div className="banner" key={imagen}>
                        <img src={imagen} alt={`Banner ${i + 1}`}/>

                    </div>
                ))}

            </div>
        </section>
    )

}

export default Slider;