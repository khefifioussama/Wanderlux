import React from "react";
import BlogsComp from "../components/Blogs/BlogsComp";
import Location from "../components/Location/Location";

const About = () => {
  return (
    <>
      <div className="container pt-14">
        <div className="py-10">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            About us
          </h1>
          <p>
          Chez Wanderlux, Nous Croyons Que Chaque Voyage Est Une Opportunité De Créer Des Souvenirs Durables Et De Vivre Des Expériences Uniques. Que Vous Souhaitiez Explorer Les Sites Historiques Fascinants, Vous Détendre Sur Les Magnifiques Plages Méditerranéennes, Ou Découvrir Les Trésors Cachés De Nos Régions Pittoresques, Nous Sommes Là Pour Vous Aider À Réaliser Vos Rêves De Voyage.
          </p>
          <br />
        
        </div>
      </div>
      <Location />

    </>
  );
};

export default About;
