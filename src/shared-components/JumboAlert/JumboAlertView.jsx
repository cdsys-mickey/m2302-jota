import { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import {
	CheckCircleOutline,
	InfoOutlined,
	WarningAmberOutlined,
	ErrorOutline,
} from "@mui/icons-material";

const iconMap = {
	success: CheckCircleOutline,
	info: InfoOutlined,
	warning: WarningAmberOutlined,
	error: ErrorOutline,
};

const JumboAlertView = ({
	severity = "info",       // 預設 info
	label,
	children,
	icon,
	height = "auto",
	fullWidth = false,
	noBackground = true,
	title,
	sx,
	slotProps = {},
}) => {
	const theme = useTheme();

	// 依照 severity 取得對應的顏色
	const getColor = (property) => {
		switch (severity) {
			case "success":
				return theme.palette.success[property];
			case "info":
				// info 使用灰色系
				switch (property) {
					case "main":
						return theme.palette.grey[500];
					case "light":
						return theme.palette.grey[200];
					case "contrastText":
						return theme.palette.grey[900];
					default:
						return theme.palette.grey[500];
				}
			case "warning":
				return theme.palette.warning[property];
			case "error":
				return theme.palette.error[property];
			default:
				// 沒有 severity 或不支援時也走灰色
				switch (property) {
					case "main":
						return theme.palette.grey[500];
					case "light":
						return theme.palette.grey[200];
					case "contrastText":
						return theme.palette.grey[900];
					default:
						return theme.palette.grey[500];
				}
		}
	};

	const mainColor = getColor("main");
	const lightColor = getColor("light");

	// 背景與邊框樣式用 useMemo 快取，避免不必要的重新計算
	const boxStyles = useMemo(() => {
		return noBackground
			? {
				backgroundColor: "transparent",
				border: "none",
			}
			: {
				backgroundColor:
					theme.palette.mode === "dark" ? lightColor : `${mainColor}1A`, // 10% 透明度
				border: `1px solid ${mainColor}`,
			};
	}, [noBackground, theme.palette.mode, mainColor, lightColor]);

	// 決定要使用的 Icon（優先使用傳入的 icon → severity 對應 → 預設 Info）
	const IconComponent = icon || (severity ? iconMap[severity] : InfoOutlined);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: 2,
				borderRadius: 1,
				textAlign: "center",
				...(fullWidth && { width: "100%" }),
				height,
				boxSizing: "border-box",
				...boxStyles,
				...sx,
			}}
		>
			{/* 大圖示 */}
			<IconComponent
				sx={{
					fontSize: 200,
					color: mainColor,
					...slotProps.icon?.sx,
				}}
				{...slotProps.icon}
			/>

			{/* 標題（若有） */}
			{title && (
				<Typography
					variant="h6"
					sx={{
						mt: 1,
						color: theme.palette.text.primary,
						fontWeight: "bold",
						...slotProps.title?.sx,
					}}
					{...slotProps.title}
				>
					{title}
				</Typography>
			)}

			{/* 內容文字：children 優先，沒有就顯示 label */}
			<Typography
				variant="subtitle1"
				sx={{
					mt: title ? 1 : 2,
					color: theme.palette.text.secondary,
					fontWeight: "medium",
					...slotProps.label?.sx,
				}}
				{...slotProps.label}
			>
				{children || label}
			</Typography>
		</Box>
	);
};

export default JumboAlertView;