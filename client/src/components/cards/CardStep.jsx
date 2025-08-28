// components/CardStep.jsx
const CardStep = ({ 
  stepNumber, 
  title, 
  description,
  imageSrc, 
  imageAlt,
  reverse = false 
}) => {
  return (
    <div className="step-card">
      <div className={`row step-row ${reverse ? 'flex-row-reverse reverse' : ''}`}>
        <div className="col-md-4">
          <img 
            src={imageSrc} 
            className="img-fluid w-100 step-image" 
            alt={imageAlt}
            loading="lazy"
          />
        </div>
        <div className="col-md-8 p-4">
          <div className="card-body">
            <span className="step-number text-white fw-bold">Étape {stepNumber}</span>
            <h3 className="step-title">{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStep;