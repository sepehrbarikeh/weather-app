
import { Box, Typography, useTheme } from "@mui/material";
import logo from "../images/logo/componyLogo.png"
import { MailOutline, CalendarMonth } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import moment from 'jalali-moment';
import i18n from "../i18n";


function getDate() {

    const fa = i18n.language === "fa"

    const time = moment().format("HH:mm");
    const jalali = moment()
        .locale("fa")
        .format("dddd jD jMMMM jYYYY");


    const gregorian = moment()
        .locale("en")
        .format("dddd D MMMM YYYY");

        if (fa) {
            return `${time}  ${jalali}`;
        }
        return `${time}  ${gregorian}`;
}

export default function Footer() {

    const theme = useTheme()
    const { t } = useTranslation();

    return (
        <>
            <Box sx={{
                color: theme.palette.custom.text,
                p: 2,
                background: `linear-gradient(90deg, ${theme.palette.custom.footerBgGradient[0]} 0%, ${theme.palette.custom.footerBgGradient[0]} 5%, ${theme.palette.custom.footerBgGradient[1]} 10%, ${theme.palette.custom.footerBgGradient[1]} 50%, ${theme.palette.custom.footerBgGradient[1]} 70%, ${theme.palette.custom.footerBgGradient[2]} 95%, ${theme.palette.custom.footerBgGradient[2]} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <img style={{
                        marginInline: "10px",
                        widows: "50px",
                        height: "50px",
                    }} src={logo} alt="" />
                    <Typography sx={{
                        mx: 1
                    }} variant="caption">
                        {t("footer")}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        mx: 2
                    }}>
                        <MailOutline />
                        <Typography sx={{
                            mx: 1
                        }} variant="caption">
                            {t("contact_us")} <Typography sx={{
                                color:theme.palette.custom.text,
                                textDecoration:"none"
                            }} component="a" href="mailto:info@nadin.ir">info@nadin.ir</Typography>
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        mx: 2
                    }}>
                        < CalendarMonth />
                        <Typography sx={{
                            mx: 1
                        }} variant="caption">
                            {getDate()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}