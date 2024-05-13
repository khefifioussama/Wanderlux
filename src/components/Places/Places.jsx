import React from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/boat.jpg";
import Img2 from "../../assets/places/tajmahal.jpg";
import Img3 from "../../assets/places/water.jpg";
import Img4 from "../../assets/places/place4.jpg";
import Img5 from "../../assets/places/place5.jpg";
import Img6 from "../../assets/places/place6.jpg";

const PlacesData = [
  {
    img: Img1,
    title: "Sharm El sheik",
    location: "Egypt",
    description: "Sharm El Sheikh, situé sur la pointe sud de la péninsule du Sinaï en Égypte, est une destination balnéaire renommée pour ses eaux cristallines, ses récifs de corail colorés et ses activités de plongée sous-marine.",
    price: 3850,
    type: "Détente Culturelle",
  },
  {
    img: Img2,
    title: "Istanbul",
    location: "Turqie",
    description:
      "Istanbul, une ville emblématique qui relie l'Europe et l'Asie à travers le détroit du Bosphore, est imprégnée de richesse historique, de culture vibrante et d'une atmosphère dynamique. Ses monuments majestueux, son architecture fascinante, ses marchés animés et sa cuisine délicieuse en font une destination inoubliable où l'ancien et le moderne se rencontrent harmonieusement.",
    price: 1590,
    type: "Détente Culturelle",
  },
  {
    img: Img3,
    title: "Casablanca",
    location: "Maroc",
    description:
      "Casablanca, la plus grande ville du Maroc, est une métropole côtière dynamique qui mélange habilement tradition et modernité. Connue pour sa célèbre mosquée Hassan II, son architecture Art déco, ses marchés animés et sa vie nocturne effervescente, Casablanca offre une expérience urbaine fascinante et multiculturelle aux visiteurs.",
    price: 3690,
    type: "Détente Culturelle",
  },
  {
    img: Img4,
    title: "Kuala lumpur",
    location: "Bali",
    description: "Kuala Lumpur, la capitale de la Malaisie, est une ville cosmopolite imprégnée d'une riche diversité culturelle. Entre ses gratte-ciel modernes, ses quartiers historiques, ses temples colorés et ses marchés animés, Kuala Lumpur offre une expérience urbaine dynamique et captivante.",
    price: 2790,
    type: "Détente Culturelle",
  },
  {
    img: Img5,
    title: "Kuala lumpur-Phuket",
    location: "Phuket",
    description:
      "Kuala Lumpur et Phuket combinent l'excitation urbaine et les paradis tropicaux, offrant une immersion culturelle dans la capitale dynamique de la Malaisie et des plages de sable blanc spectaculaires sur l'île thaïlandaise.",
    price: 2890,
    type: "Détente Culturelle",
  },
  {
    img: Img6,
    title: "Barcelone & Costa brava",
    location: "Californie",
    description:
      "Barcelone et la Costa Brava offrent une immersion inégalée dans la culture méditerranéenne, entre l'architecture emblématique de Gaudí et les criques pittoresques de la côte sauvage catalane.",
    price: 4890,
    type: "Détente Culturelle",
  },
];

const Places = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Meilleurs Endroits à Visiter
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PlacesData.map((item, index) => (
              <PlaceCard
                handleOrderPopup={handleOrderPopup}
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;
