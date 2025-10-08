
import React from "react";

function Alert({ alert }) {
  if (!alert) return null;

  
  return (
    <div className={`alert alert-${alert.type} fade show shadow-sm`} role="alert">
      <strong className="me-1">{alert.type.toUpperCase()}</strong>
      {alert.mssg}
    </div>
  );
}

export default Alert;