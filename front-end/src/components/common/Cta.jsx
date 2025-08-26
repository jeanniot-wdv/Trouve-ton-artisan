import { Link } from "react-router-dom";

const Cta = ({
  title, 
  description, 
  textButtonLeft, 
  textButtonRight, 
  linkToLeft, 
  linkToRight
}) => {
  return (
    <section className="cta-section py-5 text-white">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="display-5 mb-4">{title}</h2>
            <p className="lead mb-5">{description}</p>
            <div className="d-flex flex-wrap justify-content-center gap-3 cta-buttons">

              <Link to={`/${linkToLeft}`}
                className="btn btn-outline-light px-4">
                {textButtonLeft}</Link>
              <Link to={`/${linkToRight}`} 
                className="btn btn-outline-light px-4">
                {textButtonRight}</Link>

            </div>
          </div>
        </div>
      </div>
    </section>    
  )
}

export default Cta;