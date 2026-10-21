import "../../styles/Nosotros.css";

function Nosotros() {
  return (
    <main className="sobre-nosotros">
      <section className="nosotros-hero">
        <p className="nosotros-etiqueta">Tecnología para tu setup</p>
        <h1>Sobre Caché</h1>
        <p>
          Elegimos periféricos para que disfrutes más cada partida, proyecto
          y momento frente a tu computador.
        </p>
      </section>

      <section className="nosotros-intro" aria-labelledby="nosotros-origen">
        <div className="nosotros-acento" aria-hidden="true" />
        <div>
          <h2 id="nosotros-origen">Un setup que se siente tuyo</h2>
          <p>
            En Caché acercamos el mundo de la tecnología y el gaming a quienes
            quieren armar o renovar su espacio. Reunimos periféricos y
            accesorios para distintos estilos y necesidades, con información
            clara para que puedas elegir con confianza.
          </p>
          <p>
            Creemos que una buena experiencia empieza antes de encender el
            equipo: por eso queremos ayudarte a encontrar los productos que
            mejor se adapten a ti.
          </p>
        </div>
      </section>

      <section className="nosotros-principios" aria-label="Nuestros principios">
        <article className="nosotros-card">
          <span aria-hidden="true">01</span>
          <h2>Lo que nos mueve</h2>
          <p>
            Hacer más fácil descubrir y elegir periféricos para cada tipo de
            usuario, desde quien empieza su setup hasta quien busca llevarlo
            al siguiente nivel.
          </p>
        </article>

        <article className="nosotros-card">
          <span aria-hidden="true">02</span>
          <h2>Cómo lo hacemos</h2>
          <p>
            Con un catálogo cuidadosamente presentado, atención cercana y
            recomendaciones honestas, priorizando una compra informada.
          </p>
        </article>

        <article className="nosotros-card">
          <span aria-hidden="true">03</span>
          <h2>En qué creemos</h2>
          <p>
            En la tecnología como una forma de crear, jugar y conectar. Cada
            persona tiene su propio estilo; queremos ayudarle a expresarlo.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Nosotros;