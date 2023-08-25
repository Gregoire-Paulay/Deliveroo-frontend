const Hero = ({ name, description, picture }) => {
  return (
    <section className="description">
      <div className="container">
        <div>
          <h1> {name}</h1>
          <p>{description}</p>
        </div>
        <img src={picture} alt="Pain quotidien" />
      </div>
    </section>
  );
};

export default Hero;
