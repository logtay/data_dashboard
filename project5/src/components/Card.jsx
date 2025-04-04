import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="card">
      <h1>{title}</h1>
   <p>{value}</p>
    </div>
  );
}

export default Card;