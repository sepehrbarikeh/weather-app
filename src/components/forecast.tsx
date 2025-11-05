import { Box, Typography, useTheme } from "@mui/material";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import type { DailyForecast } from "../service/weatherServices";


interface Props {
    forecase: DailyForecast[] | undefined
}

const LazyComponent = React.lazy(() => import("./forecastCard"));

export default function Forecast({ forecase }: Props) {


    const theme = useTheme()
    const { t } = useTranslation();

    return (
        <Box sx={{
            bgcolor: theme.palette.custom.cardBg,
            borderRadius: 1.4,
            p: 2,
            boxShadow: '0 4px 4px rgba(0,0,0,0.1)',
        }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.custom.text, mb: 3 }}>{t("forecast")}</Typography>
            <Box sx={{
                display: "flex",
                overflow: "auto"
            }}>
                <Suspense fallback={<div>Loading...</div>}>
                    {
                        forecase?.map((item,index) => (
                            <LazyComponent key={index}  data={item} />
                        ))
                    }
                </Suspense>

            </Box>
        </Box>
    )
}