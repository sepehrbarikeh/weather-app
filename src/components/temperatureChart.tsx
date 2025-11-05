import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { MonthlyTempData } from "../service/weatherServices";

interface Props {
  data : MonthlyTempData[] | undefined
}

export default function TemperatureChart({data} : Props) {
  

console.log(data)

  const theme = useTheme()
  const { t,i18n } = useTranslation();

  return (
    <Card
      sx={{
        borderRadius: 1.4,
        bgcolor: theme.palette.custom.cardBg,
        pt: 2,
        px: 2,
        boxShadow: '0 4px 4px rgba(0,0,0,0)',
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 1.5, fontWeight: 700, color: theme.palette.custom.text }}
      >
        {t("monthly_average")}
      </Typography>
      <CardContent sx={{ height: 216, p: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4cc3e0" />
                <stop offset="100%" stopColor="#5b7dff" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#bfc9d6"
              vertical={false}
            />
            <XAxis
              dataKey={i18n.language ==="fa" ? "month" : "monthEn"}
              stroke={theme.palette.custom.text}
              fontSize={12}
              tickMargin={10}
            />
            <YAxis
              stroke={theme.palette.custom.text}
              fontSize={12}
              style={{
              }}
              tickMargin={i18n.language === "fa" ? 30 : 10}
              domain={[10, 40]}
              ticks={[10, 20, 30, 40]}
              tickFormatter={(val) => `${val}°c`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.custom.loginBg,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
              formatter={(value) => [`${value}°c`, "Temperature"]}
            />
            <Line
              type="linear"
              dataKey="temp"
              stroke="url(#tempGradient)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
