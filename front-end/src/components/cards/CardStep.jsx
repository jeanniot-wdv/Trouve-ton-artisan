// components/CardStep.jsx
import React from 'react';
import './cardStep.scss';

const CardStep = ({ 
  stepNumber, 
  title, 
  description, 
  imageSrc = "https://placehold.co/300x200", 
  imageAlt = "Illustration de l'étape",
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
            <span className="step-number">Étape {stepNumber}</span>
            <h3 className="step-title">{title}</h3>
            <p className="step-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStep;