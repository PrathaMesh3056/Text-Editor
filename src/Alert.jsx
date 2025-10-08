// Alert.jsx
import React from "react";

function Alert({ alert }) {
  if (!alert) return null;

  return (
    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      <strong className="me-1">{alert.type.toUpperCase()}</strong>
      {alert.mssg}
    </div>
  );
}

export default Alert;
