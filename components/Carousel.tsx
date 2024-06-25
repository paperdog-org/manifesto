'use client'
//carousels/Bootstrap.js
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import styles from "../styles/Bootstrap.module.css";
export default function BootstrapCarousel() {

    const { bootstrap } = { "bootstrap" : [
        {
          "id": 1,
          "title": "where we going to?",
          "body": "the moon",
          "imageUrl": "/pdognobgfocus.png"
        },
        {
          "id": 2,
          "title": "forever",
          "body": "last name ever, first name greatest",
          "imageUrl": "/pdognobgfocus.png"
        },
        {
          "id": 3,
          "title": "wild life",
          "body": "14!203!!",
          "imageUrl": "/pdognobgfocus.png"
        },
        {
          "id": 4,
          "title": "foods and culture",
          "body": "dishoom's chicken ruby",
          "imageUrl": "/pdognobgfocus.png"
        },
        {
          "id": 5,
          "title": "KOBEEEE",
          "body": "",
          "imageUrl": "/pdognobgfocus.png"
        }
      ]
    }
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    };
    return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
        {bootstrap.map((item) => (
        <Carousel.Item key={item.id} interval={4000}>
            <img src={item.imageUrl} alt="slides" />
            <Carousel.Caption >
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            </Carousel.Caption>
        </Carousel.Item>
        ))}
    </Carousel>
    );
}

