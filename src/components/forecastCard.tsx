import { Box, Divider, Typography, useTheme } from "@mui/material";
import sunny from "../images/weather/suny.png"
import cloudy from "../images/weather/cloudy.png"
import rainy from "../images/weather/rainy.png"
import stormy from "../images/weather/stormy.png"
import type { DailyForecast } from "../service/weatherServices";
import i18n from "../i18n";


const weatherImage = (precipProbability: number) => {
    switch (true) {
        case precipProbability <= 30:
            return sunny
        case precipProbability <= 70:
            return cloudy
        case precipProbability < 90:
            return rainy
        default:
            return stormy
    }
};

interface Props {
    data: DailyForecast
}

export default function ForecastCard({ data }: Props) {

    const fa = i18n.language === "fa"
    const theme = useTheme()

    return (
        <>
            <Box sx={{
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                bgcolor: theme.palette.custom.forecasteBg,
                borderRadius: 2.5,
                p: 2,
                m: 1.3
            }}>
                <Typography sx={{
                    color: theme.palette.custom.text,
                    textShadow: '0 4px 4px rgba(0,0,0,0.1)'
                }} variant="h6">{fa ? data.dayOfWeek : data.dayOfWeekEn}</Typography>
                <Divider sx={{
                    bgcolor: theme.palette.custom.text,
                    width: "55px",
                    filter: 'blur(.8px)',
                }} />
                <Box sx={{
                    width: "72px",
                    height: "72px"
                }}>
                    <img style={{
                        width: "100%",
                        height: "100%"
                    }} src={weatherImage(data.precipProbability)} alt="sunny" />
                </Box>
                <Typography sx={{
                    color: theme.palette.custom.text
                }} variant="h6">{data.temp}º C</Typography>
            </Box>
        </>
    )
}