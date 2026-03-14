const photos = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

export function ConferenciaPage() {
  return (
    <>
      <section className="seccion">
        <h2>La mejor conferencia de diseño web en español</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco lab.
        </p>
      </section>

      <section className="seccion contenedor">
        <h2>Galeria de fotos</h2>
        <div className="galeria">
          {photos.map((id) => (
            <a
              key={id}
              href={`/legacy/img/galeria/${id}.jpg`}
              data-lightbox="galeria"
              target="_blank"
              rel="noreferrer"
            >
              <img src={`/legacy/img/galeria/thumbs/${id}.jpg`} alt={`Galeria ${id}`} />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
