// components/cards/CardConfiance.jsx

const CardConfiance = ({icon, iconColor, title, description}) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="card h-100 border-0 shadow-sm text-center trust-card">
        <div className="card-body p-4">
          <div className={`trust-icon trust-icon-${iconColor} mb-3`}>
            <i className={`bi bi-${icon} fs-1 text-white`}></i>
          </div>
          <h4 className="fw-medium mb-3 trust-card-title">{title}</h4>
          <p className="text-muted">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default CardConfiance;