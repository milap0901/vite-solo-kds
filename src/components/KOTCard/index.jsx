import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import deliveryImg from "../../assets/icons/delivery w-01.png";
import pickUpImg from "../../assets/icons/pick up-w-01.png";
import dineInIng from "../../assets/icons/dine in-w-01.png";
import customerInfo from "../../assets/icons/Contact info.png";
import { v4 as uuidv4 } from "uuid";
import noteIcon from "../../assets/icons/note.png";
import axios from "axios";

function Timer({ startTime }) {
  const [timer, setTimer] = useState();

  const initialDate = new Date(startTime);
  const initalTime = initialDate.getTime();

  function getTimeDifference(initialTime) {
    const now = new Date();
    const difference = now - initialTime;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const min = Math.floor((difference % (1000 * 60 * 60)) / 60000);
    const seconds = ((difference % 60000) / 1000).toFixed(0);
    const timer = `${hours < 1 ? "" : `${hours} :`} ${
      min < 10 ? "0" : ""
    }${min} : ${seconds < 10 ? "0" : ""}${seconds}`;
    setTimer(timer);
  }

  useEffect(() => {
    getTimeDifference(initalTime);

    const int = setInterval(() => {
      getTimeDifference(initalTime);
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [initalTime]);

  return <div className={styles.timer}>{timer}</div>;
}

const getHeaderTheme = (type) => {
  if (type === "delivery") {
    return {
      style: { backgroundColor: "#B21368" },
      image: deliveryImg,
    };
  }
  if (type === "pick_up") {
    return {
      style: { backgroundColor: "#5540A0" },
      image: pickUpImg,
    };
  } else {
    return {
      style: { backgroundColor: "#529EA0" },
      image: dineInIng,
    };
  }
};

const updateKOT = async (kotData) => {
  let { data } = await axios.put(
    "http://localhost:3001/api/v2/kots/liveKot",
    kotData
  );
  console.log("data", data);
  return data;
};

const getDisplayName = (name) => {
  return name
    .split("_")
    .filter((x) => x.length > 0)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
};

const KOTCard = (data) => {
  const KOT = data.KOT;

  // Initialize the selectedItems state
  const [selectedItems, setSelectedItems] = useState(() => {
    const initialState = {};
    KOT.items.forEach((item) => {
      initialState[item.item_name] = item.food_is_ready_time ? true : false;
    });
    return initialState;
  });

  const handleCheckboxChange = async (e, item) => {
    const { checked } = e.target;

    // Update the state
    setSelectedItems((prev) => ({
      ...prev,
      [item.item_name]: checked,
    }));

    // API Call
    try {
      const response = await fetch(
        "http://localhost:3001/api/v2/kds/itemStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kotId: KOT.id, // Assuming KOT has an id
            itemId: item.id, // Assuming item has an id
            checked,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item status");
      }

      console.log("Item status updated successfully");
    } catch (error) {
      console.error("Error updating item status:", error);
    }
  };

  return (
    <div className={styles.KOTCard}>
      <header className={styles.cardHeader}>
        <div>
          <div
            style={getHeaderTheme(KOT.order_type).style}
            className={styles.btncolor}
          >
            {getDisplayName(KOT.order_type)}
            {KOT.table_no ? ` - ${KOT.table_no}` : ""}
          </div>
          <Timer startTime={KOT.created_at} />
          <div
            className={styles.headerImage}
            style={getHeaderTheme(KOT.order_type).style}
          >
            <img
              src={getHeaderTheme(KOT.order_type).image}
              className={styles.imageSet}
              alt="Order type icon"
            />
          </div>

          <div
            style={getHeaderTheme(KOT.order_type).style}
            className={styles.btncolor}
          >
            Token No. {KOT.token_no}
          </div>
        </div>
      </header>
      {KOT.customer_name && (
        <div className={styles.KOTCustomerDetail}>
          <div style={{ display: "flex" }}>
            <img src={customerInfo} className={styles.contactIcon} alt="" />
            <div>{KOT.customer_name}</div>
          </div>
          <div>{KOT.phone_number}</div>
        </div>
      )}
      <div className={styles.KOTItemHeader}>
        <div>Item</div>
        <div>QTY.</div>
      </div>
      {KOT.items.map((item) => {
        return (
          <div className={styles.KOTItemsDetail} key={uuidv4()}>
            <div
              className={`${styles.KOTItemName} ${
                item.status === 0 ? styles.strikeThrough : null
              }`}
              style={{
                fontWeight: item.food_is_ready_time ? "bold" : "normal",
              }}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedItems[item.item_name] || false}
                onChange={(e) => handleCheckboxChange(e, item)}
              />
              <span style={{ width: " 150px", wordBreak: "normal" }}>
                {item.item_name}
                {item.variation_name ? `- ${item.variation_name}` : null}
                {item?.item_addons?.length
                  ? item.item_addons.map((addon) => (
                      <span key={uuidv4()}>
                        / {addon.name} ({addon.quantity})
                      </span>
                    ))
                  : null}
                <br />
                {item?.description && `Note: (${item?.description})`}
              </span>
            </div>
            <div
              className={`${styles.KOTItemQty} ${
                item.status === 0 ? styles.strikeThrough : null
              }`}
              style={{
                fontWeight: item.food_is_ready_time ? "bold" : "normal",
              }}
            >
              {item.quantity}
            </div>
          </div>
        );
      })}

      {KOT.description ? (
        <>
          <div className={styles.extraNotes}>
            {" "}
            <img src={noteIcon} className={styles.noteIcon} alt="" />
            {KOT.description}
          </div>
        </>
      ) : (
        ""
      )}
      <div className={styles.footer}>
        <button
          onClick={() =>
            updateKOT({
              id: KOT.id,
              order_id: KOT.pos_order_id,
              order_type: KOT.order_type,
              kot_status: "food_is_ready",
              online_order_id: KOT.online_order_id,
            })
          }
        >
          Food Is Ready
        </button>
      </div>
    </div>
  );
};

export default KOTCard;
