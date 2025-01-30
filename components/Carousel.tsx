'use client'
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BootstrapCarousel() {
    const { bootstrap } = {
        "bootstrap": [
            {
                "id": 1,
                "title": "TEMPORAL COORDINATES LOCKED",
                "body": "2025 → 2232",
                "imageUrl": "/pdognobgfocus.png"
            },
            {
                "id": 2,
                "title": "QUANTUM STATE DETECTED",
                "body": "paperH8WDY7iWW3tCgZy4v9mPzvkBWM4AhewC71Hi9j",
                "imageUrl": "/pdognobgfocus.png"
            },
            {
                "id": 3,
                "title": "HOPE PROTOCOL STATUS",
                "body": "6:51 ANOMALY ACTIVE",
                "imageUrl": "/pdognobgfocus.png"
            },
            {
                "id": 4,
                "title": "SYSTEMS COMPROMISED",
                "body": "dogRDrw97cz9w9xrF12WQBALDip5rHdb7mYa4ZEPjGW",
                "imageUrl": "/pdognobgfocus.png"
            },
            {
                "id": 5,
                "title": "INITIATING S.O.L.",
                "body": "The Future depends on You",
                "imageUrl": "/pdognobgfocus.png"
            }
        ]
    }

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel 
            activeIndex={index} 
            onSelect={handleSelect} 
            className="temporal-carousel"
        >
            {bootstrap.map((item) => (
                <Carousel.Item key={item.id} interval={6510}>
                    <img 
                        src={item.imageUrl} 
                        alt="temporal marker" 
                        className="quantum-image"
                    />
                    <Carousel.Caption className="temporal-caption">
                        <h3 className="text-lg font-mono">{item.title}</h3>
                        <p className="text-sm opacity-75 font-mono">{item.body}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}