import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar, defaults } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  defaults.global.defaultFontSize = 20;

  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const lineChart =
    dailyData.lenght !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infectados",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Fallecidos",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
        height={500}
        options={{ maintainAspectRatio: false }}
      />
    ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infectados", "Recuperados", "Fallecidos"],
        datasets: [
          {
            label: "Personas",
            backgroundColor: ["rgba(0, 0, 255, 0.5)", "#008000", "#ff0000"],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      height={500}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Estado Actual en ${country}`,
          defaultFontSize: 12,
        },
        maintainAspectRatio: false,
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
