import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar, defaults } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";

import styles from "./Chart.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Chart = ({ data: { confirmed, deaths, recovered }, country, trend }) => {
  const classes = useStyles();
  if (trend === undefined) {
    trend = {};
  }
  defaults.global.defaultFontSize = 20;
  const [dailyData, setDailyData] = useState([]);

  const casesTrend = trend.cases;
  const recoveredTrend = trend.recovered;

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
        options={{
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: true,
            text: `Resumen de casos Global`,
            defaultFontSize: 12,
            responsive: true,
          },
        }}
      />
    ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infectados", "Recuperados", "Fallecidos"],
        datasets: [
          {
            label: "Personas",
            backgroundColor: ["#3333ff", "#008000", "#ff0000"],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      height={500}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Estado actual en ${country}`,
          defaultFontSize: 12,
          responsive: true,
        },
        maintainAspectRatio: false,
      }}
    />
  ) : null;

  const lineTrend = casesTrend ? (
    <Line
      data={{
        labels: casesTrend.map(({ date }) => date),
        datasets: [
          {
            data: casesTrend.map(({ cases }) => cases),
            label: "Infectados",
            borderColor: "#3333ff",
            fill: false,
          },
          {
            data: recoveredTrend.map(({ cases }) => cases),
            label: "Recuperados",
            borderColor: "#008000",
            fill: false,
          },
        ],
      }}
      height={500}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: `Propagación Últimos 45 días`,
          defaultFontSize: 12,
          responsive: true,
        },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {country
          ? [
              <Grid item xs={12} sm={12} key={Math.random()}>
                <Paper className={classes.paper}>
                  <div>
                    {barChart} {"\n"}
                  </div>
                </Paper>
              </Grid>,
              <Grid item xs={12} sm={12} key={Math.random()}>
                <Paper className={classes.paper}>
                  <div>
                    {" "}
                    {"\n"}
                    {lineTrend}
                    <Typography color="textSecondary">
                      Los gráficos anteriores se actualizan después del cierre
                      del día en GMT + 0
                    </Typography>
                  </div>
                </Paper>
              </Grid>,
            ]
          : lineChart}
      </Grid>
      {"\n"}
    </div>
  );
};

export default Chart;
