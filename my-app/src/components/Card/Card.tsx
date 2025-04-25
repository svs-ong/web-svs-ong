import React from "react";
import "./Card.styles.css";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  date,
}) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <span>{date}</span>
      </div>
    </div>
  );
};
