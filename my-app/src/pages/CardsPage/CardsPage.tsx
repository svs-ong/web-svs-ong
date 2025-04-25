import React from "react";
import { Card } from "../../components/Card/Card";
import "./CardsPage.styles.css";

const mockData = [
  {
    title: "Card Title 1",
    description: "This is a description for card 1.",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    date: "2024-08-10",
  },
  {
    title: "Card Title 2",
    description: "This is a description for card 2.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT53oaI27s3aNqsnrUqdBlv4eIR-HxS1tuUQ&s",
    date: "2024-08-11",
  },
];

export const CardsPage: React.FC = () => {
  return (
    <div className="cards-page">
      {mockData.map((data, index) => (
        <Card
          key={index}
          title={data.title}
          description={data.description}
          imageUrl={data.imageUrl}
          date={data.date}
        />
      ))}
    </div>
  );
};
