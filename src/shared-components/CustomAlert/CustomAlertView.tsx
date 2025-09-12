import React, { ComponentType } from "react";
import { Box, Typography, SxProps, Theme, useTheme } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon"; // 新增：匯入 SvgIconProps
import {
	CheckCircleOutline,
	InfoOutlined,
	WarningAmberOutlined,
	ErrorOutline,
} from "@mui/icons-material";

// 定義 severity 類型
type Severity = "success" | "info" | "warning" | "error";

// 定義元件的屬性
interface CustomAlertProps {
	severity?: Severity;
	label: string;
	icon?: ComponentType<SvgIconProps>; // 修正：使用 SvgIconProps 替代 { sx?: any; color?: string }
	height?: string | number;
	fullWidth?: boolean;
	sx?: SxProps<Theme>;
}

// 圖示與 severity 的映射
const iconMap: Record<Severity, React.ComponentType> = {
	success: CheckCircleOutline,
	info: InfoOutlined,
	warning: WarningAmberOutlined,
	error: ErrorOutline,
};

// 自定義 Alert 元件
const CustomAlertView: React.FC<CustomAlertProps> = ({
	severity = "info",
	label,
	icon,
	height = "auto",
	fullWidth = false,
	sx,
}) => {
	const theme = useTheme(); // 使用 useTheme 獲取主題

	// 根據 severity 動態獲取顏色
	const getColor = (property: "main" | "light" | "contrastText") => {
		switch (severity) {
			case "success":
				return theme.palette.success[property];
			case "info":
				return theme.palette.info[property];
			case "warning":
				return theme.palette.warning[property];
			case "error":
				return theme.palette.error[property];
			default:
				return theme.palette.info[property];
		}
	};

	const mainColor = getColor("main"); // 主要顏色，用於圖示、文字、邊框
	const lightColor = getColor("light"); // 淺色，用於背景（可選）

	// 選擇圖示：使用自定義圖示（如果提供），否則使用 severity 對應的圖示
	const IconComponent = icon || iconMap[severity];

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: 2,
				borderRadius: 1,
				backgroundColor:
					theme.palette.mode === "dark"
						? lightColor
						: `${mainColor}1A`, // 根據模式調整背景
				border: `1px solid ${mainColor}`,
				textAlign: "center",
				...(fullWidth && {
					width: "100%",
				}),
				height,
				boxSizing: "border-box",
				...sx,
			}}>
			{/* 大圖示，使用主題顏色 */}
			<IconComponent sx={{ fontSize: 64, color: mainColor }} />
			{/* 訊息，使用主題顏色 */}
			<Typography
				variant="h6"
				sx={{ mt: 1, color: mainColor, fontWeight: "medium" }}>
				{label}
			</Typography>
		</Box>
	);
};

export default CustomAlertView;
