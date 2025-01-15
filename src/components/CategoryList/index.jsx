import React from "react";
import style from "./index.module.css";
import CategoryCard from "../CategoryCard";

const CategoryList = ({ data }) => {
  return (
    <div className={style.mainDiv}>
      {Array.isArray(data) &&
        data.map((item, index) => <CategoryCard key={index} {...item} />)}
    </div>
  );
};

export default CategoryList;
