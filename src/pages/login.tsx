import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ligtLogin from "../images/loginImages/light.jpeg";
import darkLogin from "../images/loginImages/dark.jpeg";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";
import { useColorMode } from '../context/themeContext';

const Login = () => {


  const theme = useTheme();
  const { mode } = useColorMode();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [lang, setLang] = useState<"en" | "fa">(
    (Cookies.get("lang") as "en" | "fa") || "en"
  );

  const { t, i18n } = useTranslation();


  const changeLang = (lang: "en" | "fa") => {
    setLang(lang)
    i18n.changeLanguage(lang);
    document.body.dir = lang === "fa" ? "rtl" : "ltr";
  };

  useEffect(() => {
    document.body.dir = i18n.language === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);


  const handleLogin = () => {
    if (name.trim() === '') {
      alert(t("login_alert"));
      return;
    }
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.custom.mainBg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        gap: 2,
        py: 2,
      }}
    >

      <Card
        elevation={12}
        sx={(theme) => ({
          maxWidth: 1000,
          width: { xs: "90%", sm: "85%", md: "100%" },
          borderRadius: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          bgcolor:
            theme.palette.mode === "light"
              ? "#FFFFFF"
              : theme.palette.custom.cardBg, 
        })}
      >


        <Box
          sx={(theme) => ({
            bgcolor: theme.palette.mode === "light"
             ? "#fff" 
             : theme.palette.custom.cardBg,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-around",
            alignItems: "center",
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 6 },
          })}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              textAlign="center"
              mb={4}
              color={theme.palette.custom.text}
            >
              {t("login_title")}
            </Typography>

            <TextField
              fullWidth
              onChange={(e) => setName(e.target.value)}
              placeholder={t("login_placeHolder")}
              variant="outlined"
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: .2,
                  fontSize: '1rem',
                  '& fieldset': { borderColor: '#d0d5dd' },
                  '&:hover fieldset': { borderColor: '#b0b7c2' },
                },
                '& .MuiInputBase-input': { py: 1.5 },
              }}
            />


          </Box>
          <Box sx={{
            width: "400px"
          }}>
            <Button
              onClick={handleLogin}
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.7,
                color:theme.palette.custom.text,
                borderRadius: .4,
                backgroundColor: '#1e88e5',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.05rem',
                boxShadow: '0 4px 12px rgba(30, 136, 229, 0.3)',
              }}
            >
              {t("login")}
            </Button>
          </Box>
        </Box>


        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            src={
              mode === "light"
                ? ligtLogin
                : darkLogin
            }
            alt=""
          />
        </Box>
      </Card>


      <Box sx={{ mt: { xs: 2, sm: 2.5 } }}>
        <FormControl variant="standard">
          <InputLabel
            id="language-label"
            sx={{
              fontWeight: 500,
              color: theme.palette.custom.text,
            }}
          >
            {t("language")}
          </InputLabel>
          <Select
            onChange={(e) => changeLang(e.target.value)}
            labelId="language-label"
            defaultValue={lang}
            label="Language"
            disableUnderline
            sx={{
              width: 225,
              fontSize: '1rem',
              border: 'none',
              borderBottom: '2px solid #b0b7c2',
              '&:hover': {
                borderBottomColor: '#1e88e5',
              },
              '& .MuiSelect-select': {
                py: 1,
              },
            }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fa">فارسی</MenuItem>
          </Select>
        </FormControl>
      </Box>

    </Box>
  );
};

export default Login;
