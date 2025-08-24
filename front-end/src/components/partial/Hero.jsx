
const Hero = ({
  title, 
  description, 
  children
}) => {
  
  return (
    <section className="categories-header container-fluid text-center text-white d-flex align-items-center">
      <div className="container px-3 py-4">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-4 fw-bold mb-4">{title}</h1>
            <p className="lead mb-4">{description}</p>

            {children}

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;