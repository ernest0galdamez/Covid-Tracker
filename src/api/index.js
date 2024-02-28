import axios from "axios";
import countryList from "../assets/countryList.json"
import staticData from "../data/static.json";
import trendData from "../data/trend.json";

const url = "https://covid-api.com/api";
const trendUrl = "https://corona.lmao.ninja/v2/historical";

export const fetchData = async (country) => {
  try {
    let data;
    if (country) {
      console.log(`Fetching data for country: ${country}`); // Debug logging

      // Assuming country is the three-letter ISO code as per your staticData format
      const countryData = staticData.data.find((item) => item.region.iso === country);

      if (countryData) {
        data = {
          confirmed: countryData.confirmed,
          recovered: countryData.recovered,
          deaths: countryData.deaths,
          lastUpdate: countryData.last_update,
        };
      } else {
        console.log(`No data found for country: ${country}`); // Debug logging
        data = {
          confirmed: 0,
          recovered: 0,
          deaths: 0,
          lastUpdate: new Date().toISOString(),
        };
      }
    } else {
      // Aggregate global data if needed, or handle the default case as desired
      data = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        lastUpdate: new Date().toISOString(),
      };
    }
    return data;
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
    return null; // Return null or appropriate default object on error
  }
};

export const fetchTrend = async (country) => {
  try {
    const countryData = trendData.find(item => item.country === country);
    if (!countryData) {
      console.log(`No trend data found for ${country}`);
      return { cases: [], recovered: [] }; // Return empty arrays if no data found
    }

    const casesData = countryData.timeline.cases;
    const recoveredData = countryData.timeline.recovered;
    const casesArray = [];
    const recoveredArray = [];

    // Assuming the date transformation logic remains the same
    Object.entries(casesData).forEach(([key, value]) => {
      const newDate = transformDate(key); // Reuse your date transformation logic
      casesArray.push({ date: newDate, cases: value });
    });

    Object.entries(recoveredData).forEach(([key, value]) => {
      const newDate = transformDate(key); // Reuse your date transformation logic
      recoveredArray.push({ date: newDate, cases: value });
    });

    return { cases: casesArray, recovered: recoveredArray };
  } catch (error) {
    console.error(error);
    return { cases: [], recovered: [] }; // Return empty arrays in case of an error
  }
};

// Helper function for date transformation (reuse your logic)
function transformDate(dateString) {
  var f = new Date(dateString);
  let day = f.getDate();
  let month = f.getMonth() + 1;
  let year = f.getFullYear();

  return month < 10 ? `${day}/0${month}/${year}` : `${day}/${month}/${year}`;
}

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
