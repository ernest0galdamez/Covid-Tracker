import React, { Suspense } from "react";

import {
  Cards,
  CountryPicker,
  Footer,
  LanguageSelector,
} from "./components";
import { TitleComponent } from "./components/Title/TitleComponent.jsx";
import styles from "./App.module.css";
import { fetchData, fetchTrend } from "./api";
import "./i18n";

import coronaImage from "./images/covid.png";
import juntosImage from "./images/juntos.png";

class App extends React.Component {
  state = {
    data: {
      confirmed: { value: Math.floor(Math.random() * 100000) + 1000 },
      recovered: { value: Math.floor(Math.random() * 100000) + 500 },
      deaths: { value: Math.floor(Math.random() * 10000) + 100 },
      lastUpdate: new Date().toISOString(),
    },
    country: "",
    trend: [],
  };

  handleCountryChange = async (country) => {
    console.log(`Fetching data for country: ${country}`);
    const fetchedData = await fetchData(country);
    console.log(`Fetched data: `, fetchedData);
    this.setState({ data: fetchedData, country: country }, () => {
      console.log(`Updated state: `, this.state);
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <TitleComponent title="COVID-19 Tracker React.js App" />
        <div className={styles.container}>
          <Suspense fallback={null}>
            <LanguageSelector className={styles.language} />
            <img className={styles.image} src={coronaImage} alt="Covid 19" />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Cards data={data} />
            {/* <Chart data={data} country={country} trend={trend} /> */}
          </Suspense>
          <img
            className={styles.imageJuntos}
            src={juntosImage}
            alt="Juntos Saldremos Adelante"
          />
        </div>

        <div>
          <Footer className={styles.footer} />
        </div>
      </div>
    );
  }
}

export default App;
