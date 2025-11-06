import { FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import logo from "../images/logo/appLogo.png"
import {
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Divider,
    Button,
    IconButton,
    Menu,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { SettingsOutlined, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { useEffect, useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useColorMode } from "../context/themeContext";

type City = { name: string; faName: string };

const cities: City[] = [
    { name: "Tehran", faName: "تهران", },
    { name: "London", faName: "لندن", },
    { name: "New York", faName: "نیویورک" },
    { name: "Tokyo", faName: "توکیو", },
    { name: "Sydney", faName: "سیدنی", },
    { name: "Dubai", faName: "دوبی", },
    { name: "Paris", faName: "پاریس", },
    { name: "Berlin", faName: "برلین", },
    { name: "Moscow", faName: "مسکو", },
    { name: "Rio de Janeiro", faName: "ریو دو ژانیرو", },
    { name: "Toronto", faName: "تورنتو", },
    { name: "Bangkok", faName: "بانکوک", },
    { name: "Copenhagen", faName: "کپنهاگ", },
    { name: "Madrid", faName: "مادرید", },
    { name: "Kuala Lumpur", faName: "کوالالامپور", },
];

interface Props {
    city : string
    setSities: (city: string) => void
}


export default function Nav({ setSities,city }: Props) {

    const navigate = useNavigate();
    const { toggleColorMode } = useColorMode();
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [mode, setMode] = useState<"light" | "dark">(theme.palette.mode);
    const [lang, setLang] = useState<"en" | "fa">(
        (Cookies.get("lang") as "en" | "fa") || "en"
    );

    const { t, i18n } = useTranslation();

    const fa = i18n.language === "fa"

    const changeLang = (lang: "en" | "fa") => {
        setLang(lang)
        i18n.changeLanguage(lang);
        document.body.dir = lang === "fa" ? "rtl" : "ltr";
    };

    useEffect(() => {
        document.body.dir = i18n.language === "fa" ? "rtl" : "ltr";
    }, [i18n.language]);


    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleModeChange = (
        _:
            | React.MouseEvent<HTMLElement>
            | React.KeyboardEvent<HTMLElement>
            | null,
        newMode: "light" | "dark" | null
    ) => {
        if (newMode) {
            setMode(newMode)
            toggleColorMode()
        }

    };


    return (
        <>
            <Box sx={{
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                bgcolor: theme.palette.custom.mainBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: { md: 4, xs: 2 },
                py: 2
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Box
                        component="img"
                        src={logo}
                        alt="logo"
                        sx={{
                            width: { xs: 50, sm: 50, md: 60 },
                            height: { xs: 50, sm: 50, md: 60 },
                            objectFit: "cover",
                            borderRadius: 4,
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            mx: 1,
                            color: theme.palette.custom.text
                        }}>
                        {t("nav_title")}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Box>
                        <FormControl variant="outlined" sx={{ width: { xs: "100%", sm: 225 } }}>
                            <InputLabel
                                id="city-label"
                                sx={{ fontWeight: 500, color: "#8895A0" }}
                            >
                                {t("location_selector")}
                            </InputLabel>
                            <Select
                                onChange={(e) => setSities(e.target.value)}
                                labelId="city-label"
                                value={city}
                                label="Search Your Location"
                                sx={{
                                    borderRadius: .5,
                                    fontSize: "1rem",
                                    height: { xs: 36, sm: 40 },
                                    "& .MuiSelect-select": {
                                        display: "flex",
                                        alignItems: "center",
                                        paddingLeft: 1,
                                        paddingRight: 1
                                    }
                                }}
                            >
                                {cities.map((city) => (
                                    <MenuItem
                                        key={city.name}
                                        value={city.name}
                                        sx={{ fontFamily: "vazir" }}
                                    >
                                        {fa
                                            ? city.faName
                                            : city.name
                                        }
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{
                        border: `1px solid ${open ? "#009CD8" : "#AFBCC4"}`,
                        borderRadius: .5,
                        mx: 2
                    }}>
                        <IconButton
                            onClick={handleClick}
                            sx={{ color: `${open ? "#009CD8" : "#AFBCC4"}` }}
                        >
                            <SettingsOutlined />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                    my: 2,
                                    borderRadius: .5,
                                    p: 2,
                                    width: 230,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif',
                                },
                            }}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <Typography sx={{ mb: 1.5 }} fontWeight={600} fontSize={15}>
                                {t("theme")}
                            </Typography>
                            <ToggleButtonGroup
                                value={mode}
                                exclusive
                                onChange={handleModeChange}
                                fullWidth
                                sx={{
                                    flexDirection: i18n.language === 'fa' ? 'row-reverse' : 'row',
                                    "& .MuiToggleButton-root": {
                                        textTransform: "none",
                                        flex: 1,
                                        borderColor: "#8895A0",
                                        color: "#8895A0",
                                        "&.Mui-selected": {
                                            backgroundColor: "#fff",
                                            color: "#2196F3",
                                            borderColor: "#2196F3",
                                        },
                                    },
                                }}
                            >
                                <ToggleButton sx={{ borderRadius: .5 }} value="light">
                                    <LightModeOutlined sx={{ fontSize: 18, mr: 0.5 }} /> Light
                                </ToggleButton>
                                <ToggleButton sx={{ borderRadius: .5 }} value="dark">
                                    <DarkModeOutlined sx={{ fontSize: 18, mr: 0.5 }} /> Dark
                                </ToggleButton>
                            </ToggleButtonGroup>

                            <Divider sx={{ my: 2 }} />

                            <Typography sx={{ mb: 1.5 }} fontWeight={600} fontSize={15}>
                                {t("language")}
                            </Typography>
                            <ToggleButtonGroup
                                value={lang}
                                exclusive
                                onChange={(_, w) => changeLang(w)}
                                fullWidth
                                sx={{
                                    flexDirection: i18n.language === 'fa' ? 'row-reverse' : 'row',
                                    "& .MuiToggleButton-root": {
                                        textTransform: "none",
                                        flex: 1,
                                        borderColor: "#8895A0",
                                        color: "#8895A0",
                                        "&.Mui-selected": {
                                            backgroundColor: "#fff",
                                            color: "#2196F3",
                                            borderColor: "#2196F3",
                                        },
                                    },
                                }}
                            >
                                <ToggleButton sx={{ borderRadius: .5 }} value="en">En</ToggleButton>
                                <ToggleButton sx={{ borderRadius: .5 }} value="fa">Fa</ToggleButton>
                            </ToggleButtonGroup>

                            <Divider sx={{ my: 2 }} />
                            <Button
                                startIcon={<Logout sx={{
                                    mx: 1
                                }} />}
                                sx={{
                                    textTransform: "none",
                                    color: theme.palette.custom.text,
                                    justifyContent: "flex-start",
                                }}
                                onClick={() => navigate("/login")}
                            >
                                {t("exit")}
                            </Button>
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
