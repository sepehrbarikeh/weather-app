import { LocationOn } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { CurrentWeather } from "../service/weatherServices";
import i18n from "../i18n";
import sunny from "../images/weather/suny.png"
import cloudy from "../images/weather/cloudy.png"
import rainy from "../images/weather/rainy.png"
import stormy from "../images/weather/stormy.png"


interface Props {
    weather: CurrentWeather | undefined
}


const weatherstatus = (precipProbability: number): "sunny" | "cloudy" | "rainy" | "stormy" => {
    switch (true) {
      case precipProbability <= 30:
        return "sunny";   
      case precipProbability <= 70:
        return "cloudy";   
      case precipProbability < 90:
        return "rainy";   
      default:
        return "stormy";  
    }
  };
 const weatherDetail = {
    sunny: {
        en : "Clear",
        fa: "آفتابی",
        image : sunny
    },
    cloudy: {
        en : "Cloudy",
        fa: "ابری",
        image : cloudy
    },
    rainy: {
        en : "Rainy",
        fa: "بارانی",
        image : rainy
    },
    stormy: {
        en : "Stormy",
        fa: "طوفانی",
        image : stormy
    },
 }

export default function WeatherCard({weather} : Props) {
    const fa = i18n.language === "fa"

    const theme = useTheme()
    const { t } = useTranslation();

    const w = weatherstatus(weather?.precipProbability ?? 0);
    const detail = weatherDetail[w]


    return (
        <>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: theme.palette.custom.cardBg,
                borderRadius: 1.4,
                p: 2.5,
                boxShadow: '0 4px 4px rgba(0,0,0,0.1)',
            }} >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-evenly"

                }} >
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#CDD9E0",
                        borderRadius: 2,
                        px: 1,
                        py: .5
                    }}>
                        <LocationOn sx={{ color: "#3D4852" }} />
                        <Typography sx={{ mx: 2, color: "#3D4852" }}>{weather?.cityEn}</Typography>
                    </Box>
                    <Box sx={{
                        color: theme.palette.custom.text
                    }}>
                        <Typography variant="h4">{fa ? weather?.dayOfWeek : weather?.dayOfWeekEn}</Typography>
                        <Typography variant="body2">{fa ? weather?.date : weather?.dateEn} {fa ? weather?.time : weather?.timeEn}</Typography>
                    </Box>
                    <Box sx={{
                        color: theme.palette.custom.text,
                        mt: 1.5
                    }}>
                        <Typography variant="h4">{weather?.temp}º C</Typography>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}>
                            <Typography variant="body2">{t("high")}: {weather?.maxTemp}</Typography>
                            <Typography variant="body2">{t("low")}: {weather?.minTemp}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                }}>
                    <Box sx={{
                        widows: { xs: 150, lg: 205 },
                        height: { xs: 125, lg: 150 }
                    }}>
                        <img style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                        }} src={detail.image} alt="" />
                    </Box>
                    <Box sx={{
                        color: theme.palette.custom.text,
                    }}>
                        <Typography variant="h4">{fa ? detail.fa : detail.en}</Typography>
                        <Typography sx={{
                        }} >{t("feels_like")} {weather?.feelsLike}º C</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}