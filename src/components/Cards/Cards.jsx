import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTranslation } from "react-i18next";

import styles from "./Cards.module.css";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  const { t } = useTranslation();

  if (!confirmed) {
    return "Cargando...";
  }
  const recoveryRate = (recovered.value * 100) / confirmed.value;
  const fatalityRate = (deaths.value * 100) / confirmed.value;

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              {t("infected.label")}
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              {t("infectadosNumber.label")}
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              {t("recovered.label")}
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography variant="body2">
              {t("recoveredNumber.label")}
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              {t("deaths.label")}
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={deaths.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography variant="body2">{t("deathsNumber.label")}</Typography>
          </CardContent>
        </Grid>
      </Grid>
      <Typography color="textSecondary" style={{ paddingTop: 2 + "em" }}>
        {t("lastUpdate.label")}
        {new Date(lastUpdate).toTimeString()}
      </Typography>
      <div className={styles.progressBarfont}>
        <Grid container spacing={2} justify="center">
          <Grid
            item
            xs={12}
            md={4}
            style={{ textAlign: "center", color: "#008000" }}
          >
            <h2> {t("recoveryRate.label")}</h2>
            <CircularProgressbar
              value={recoveryRate.toFixed(2)}
              text={`${recoveryRate.toFixed(2)}%`}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: "#008000",
                textColor: "#008000",
              })}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              textAlign: "center",
              color: "#ff0000",
            }}
          >
            <h2>{t("mortalityRate.label")}</h2>
            <CircularProgressbar
              value={fatalityRate.toFixed(2)}
              text={`${fatalityRate.toFixed(2)}%`}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: "#ff0000",
                textColor: "#ff0000",
              })}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Cards;
