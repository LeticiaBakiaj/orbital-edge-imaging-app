import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.assets.thumbnail.href}
            alt={`Image ${index}`}
            style={{ borderRadius: "5px" }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
