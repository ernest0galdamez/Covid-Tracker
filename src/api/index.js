import axios from "axios";
import countryList from "../assets/countryList.json"

const url = "https://covid-api.com/api";
const trendUrl = "https://corona.lmao.ninja/v2/historical";

export const fetchData = async (country) => {
  let changedUrl = url;

  if (country) {
    changedUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changedUrl);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchTrend = async (country) => {
  var regExpr = /[*]/g;
  country = country.replace(regExpr, "");
  let changedTrendUrl = trendUrl;

  if (country) {
    //changedTrendUrl = `${trendUrl}/${country}/status/confirmed?from=${startDate}&to=${endDate}`;
    changedTrendUrl = `${trendUrl}/${country}?lastdays=45`;
    try {
      const dataTrend = await axios.get(changedTrendUrl);
      const casesData = dataTrend.data.timeline.cases;
      const recoveredData = dataTrend.data.timeline.recovered;
      const casesArray = [];
      const recoveredArray = [];

      Object.entries(casesData).forEach(([key, value]) => {
        var f = new Date(key);
        let day = f.getDate();
        let month = f.getMonth() + 1;
        let year = f.getFullYear();

        var newDate = "";
        if (month < 10) {
          newDate = `${day}/0${month}/${year}`;
        } else {
          newDate = `${day}/${month}/${year}`;
        }
        casesArray.push({ date: newDate, cases: value });
      });

      Object.entries(recoveredData).forEach(([key, value]) => {
        var f = new Date(key);
        let day = f.getDate();
        let month = f.getMonth() + 1;
        let year = f.getFullYear();

        var newDate = "";
        if (month < 10) {
          newDate = `${day}/0${month}/${year}`;
        } else {
          newDate = `${day}/${month}/${year}`;
        }
        recoveredArray.push({ date: newDate, cases: value });
      });

      const arr = { cases: casesArray, recovered: recoveredArray };
      //console.log(arr);
      return arr;
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/reports/total?date=2020-03-14`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
    return countryList.map((country) => country.name);
};
