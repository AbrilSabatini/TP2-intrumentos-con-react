
const Ubicacion = () => {
  return (
    <>
      <section>
        <h1>Donde estamos</h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6700.950643394093!2d-68.8427087136374!3d-32.8855989078983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1714076137914!5m2!1ses-419!2sar"
          width="100%"
          height="450"
          style={{ padding: "2vw", border: "0" }}
          loading="cargando"
        ></iframe>
      </section>
    </>
  );
};

export default Ubicacion;
