import React, { useEffect, useState, useCallback } from "react";
import styles from "./index.module.css";
import { motion } from "framer-motion";
import KOTCardList from "../../components/KOTCardList";
import CategoryList from "../../components/CategoryList";
import { Row } from "react-bootstrap";
import axios from "axios";
import useSocket from "../../hooks/useSocket";
import axiosInterceptors from "../../utils/axiosInterceptors";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState(null); // Initialize with null for clarity
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const axiosIntens = await axiosInterceptors(navigate);

      const response = await axiosIntens.get("/api/v2/kds/kots/liveKot");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching live KOT data:", error);
    }
  }, []);

  useSocket("KDSKOT", (newData) => {
    if (newData && newData.liveKOTsWithItems) {
      setData(newData);
    } else {
      console.error("Invalid data received from socket:", newData);
    }
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {data?.liveKOTsWithItems?.length !== 0 ? (
        <motion.div
          className={`${styles.home} d-flex flex-shrink-1 px-0 py-0 overflow-hidden`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          <Row className="mt-3 p-0 w-100">
            <div style={{ width: "20%", height: "92vh", overflow: "auto" }}>
              <CategoryList data={data?.categoryItem} />
            </div>
            <div style={{ width: "80%", height: "92vh", overflow: "auto" }}>
              <KOTCardList data={data?.liveKOTsWithItems} />
            </div>
          </Row>
        </motion.div>
      ) : (
        <div
          className={`${styles.tableContainer} h-50 d-flex align-items-center justify-content-center`}
        >
          <span className="h1">There are no KOTs to show!</span>
        </div>
      )}
    </>
  );
}

export default Home;
