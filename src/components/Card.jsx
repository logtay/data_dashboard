import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="card">
      <h1>{title}</h1>
   <h2>{value}</h2>
    </div>
  );
}

export default Card;