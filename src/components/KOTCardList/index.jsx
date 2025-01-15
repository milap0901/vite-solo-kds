import React from "react";
import KOTCard from "../KOTCard";
import style from "./index.module.css";

const KOTCardList = (data) => {
  return (
    <div className={style.mainDiv}>
      {data.data
        ?.filter((kot) => kot.kot_status === "accepted")
        .slice()
        // .sort((a, b) => (sortType === "asc" ? a.id - b.id : b.id - a.id))
        .map((KOT, idx) => {
          return <KOTCard KOT={KOT} key={KOT.id} idx={idx} />;
        })}
    </div>
  );
};

export default KOTCardList;
