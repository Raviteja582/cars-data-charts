import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

export default function CarouselComponent() {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} name={item.name} description={item.description} />
      ))}
    </Carousel>
  );
}

function Item({ name, description }: { name: string; description: string }) {
  return (
    <Paper>
      <h2>{name}</h2>
      <p>{description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
