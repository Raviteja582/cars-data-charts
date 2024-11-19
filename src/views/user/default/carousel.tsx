import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import BrandsComparisons from "assets/img/dashboards/BrandsComparison.png";
import ModelComparisons from "assets/img/dashboards/ModelsComparison.png";
import CitiesComparisons from "assets/img/dashboards/CitiesComparison.png";
import Home from "@mui/icons-material/Home";

export default function CarouselComponent() {
  var items = [
    {
      name: "Brands Comparisons",
      description: "Compare Avg Sale of Price between brands over all Models",
      image: BrandsComparisons,
    },
    {
      name: "Models Comparisons ",
      description:
        "Compare Avg Sale of Models between Models of different Brands",
      image: ModelComparisons,
    },
    {
      name: "Area Comparisons",
      description: "Compare Avg Sale of Car Sales in different Cities.",
      image: CitiesComparisons,
    },
  ];

  return (
    <Carousel IndicatorIcon={<Home />} autoPlay={true} interval={2000}>
      {items.map((item, i) => (
        <Item
          key={i}
          name={item.name}
          description={item.description}
          image={item.image}
        />
      ))}
    </Carousel>
  );
}

function Item({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: any;
}) {
  return (
    <Paper>
      <h2 className="text-center text-4xl">{name}</h2>
      <p className="text-center text-2xl">{description}</p>
      <img src={image} alt="" />
    </Paper>
  );
}
