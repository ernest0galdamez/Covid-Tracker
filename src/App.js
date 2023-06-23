import React, { Suspense } from "react";

import {
  Cards,
  Chart,
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
    data: {},
    country: "",
    trend: [],
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    const fetchedTrend = await fetchTrend(country);
    this.setState({ data: fetchedData, country: country, trend: fetchedTrend });
  };

  render() {
    const { data, country, trend } = this.state;
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
