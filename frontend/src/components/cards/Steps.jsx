import React from 'react';

const Steps = ({ steps }) => {
  return (
    <div className="steps-container">
      <div className="steps-timeline" aria-hidden="true"></div>
      
      {steps.map((step, index) => (
        <div 
          key={step.step}
          className={`step-item ${index % 2 === 0 ? 'step-left' : 'step-right'}`}
        >
          <div className="step-number" aria-hidden="true">
            <span>{step.step}</span>
          </div>
          
          <div className="step-content">
            <div className="step-image">
              <img 
                src={step.image}
                alt={step.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <div className="step-text">
              <h3 className="step-title">
                <span className="step-title-number" aria-label={`Étape ${step.step}`}>
                  Étape {step.step}
                </span>
                {step.title}
              </h3>
              <p className="step-description">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Steps;