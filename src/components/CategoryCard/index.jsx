import React from "react";
import style from "./index.module.css";

const CategoryCard = (item) => (
  <div className={style.mainDiv}>
    <div>
      <div className={style.title}>{item.categoryName}</div>
      {item?.items?.map((subItem, index) => (
        <div className={style.itemContainer} key={index}>
          <div>
            <div className={style.itemName}>{subItem.itemName}</div>
            {subItem.itemAddon &&
              subItem.itemAddon.map((addon, index) => (
                <span key={index} className={style.itemAddon}>
                  {addon.name} ({addon.quantity})
                </span>
              ))}
          </div>
          <div className={style.itemTotal}>{subItem.itemTotal}</div>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryCard;
