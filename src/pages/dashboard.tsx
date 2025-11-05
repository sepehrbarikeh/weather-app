/* eslint-disable react-hooks/rules-of-hooks */
import { Box, useTheme } from "@mui/material";
import Nav from "../components/nav";
import WeatherCard from "../components/weatherCard";
import TemperatureChart from "../components/temperatureChart";
import Forecast from "../components/forecast";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { getMonthlyTemperatureData, getWeatherData, type CurrentWeather, type DailyForecast, type MonthlyTempData } from "../service/weatherServices";




const Dashboard = () => {
  const [cities, setSities] = useState("Tehran")
  const [weatherData, setWeatherData] = useState<CurrentWeather>()
  const [chartData, setChartData] = useState<MonthlyTempData[]>()
  const [forecastData, setForecastData] = useState<DailyForecast[]>()


  const fetchData = async () => {
    const res = await getWeatherData(cities)
    try{
    setWeatherData(res.current)
    setForecastData(res.forecast)
    }catch(error){
      console.log("Weather fetch error:", error);
    }
  }

  const fetchChartData = async () => {
    const res = await getMonthlyTemperatureData(cities)
    try{
    setChartData(res)
    }catch(error){
      console.log("Weather Chart fetch error:", error);
    }
  }

  useEffect(() => {
    fetchData()
    fetchChartData()
  },[cities])

  const theme = useTheme()

  return (
    <>
      <Box sx={{ bgcolor: theme.palette.custom.mainBg, minHeight: "100vh" }}>
        <Nav setSities={setSities} />
        <Box
          sx={{
            display: "grid",
            gap: 2,
            p: 2,
            gridTemplateColumns: {
              xs: "1fr",
              lg: "repeat(2, 1fr)",
            },
          }}
        >
          <WeatherCard weather={weatherData} />
          <TemperatureChart data={chartData} />
        </Box>
        <Box sx={{
          p: 2,
        }}>
          <Forecast forecase={forecastData} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Dashboard;
