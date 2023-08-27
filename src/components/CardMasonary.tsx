import "./styles/Cards.css";
import Card from "./Card";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const CardMasonary = () => {
  return (
    <div style={{ width: "100%" }}>
      {/* <ResponsiveMasonry
        columnsCountBreakPoints={{
          275: 1,
          560: 2,
          850: 3,
          1150: 4,
          1350: 5,
          1650: 5,
        }}
      >
        <Masonry gutter="1rem">
          {data.map((card) => (
            <Card
              key={card.id}
              card={card}
              setData={setData}
              setModal={setModal}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry> */}
    </div>
  );
};

export default CardMasonary;
