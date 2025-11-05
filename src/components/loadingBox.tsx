// components/LoadingBox.tsx
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

interface LoadingBoxProps {
  message?: string;
  className?: string;
}

export default function LoadingBox({ 
  message, 
  className 
}: LoadingBoxProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isRtl = theme.direction === "rtl";

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      className={className}
    >
     
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        }}
      />

     
      <Box
        sx={{
          position: "relative",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          minWidth: 200,
          direction: isRtl ? "rtl" : "ltr",
        }}
      >
       
        <CircularProgress 
          size={32} 
          thickness={4}
          sx={{
            color: "primary.main",
          }}
        />

       
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            fontFamily: isRtl ? '"Vazirmatn", sans-serif' : "inherit",
          }}
        >
          {message || t("loading_message")}
        </Typography>
      </Box>
    </Box>
  );
}