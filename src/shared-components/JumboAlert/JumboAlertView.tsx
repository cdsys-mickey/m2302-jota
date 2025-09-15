import React, { ComponentType, useMemo } from "react";
import { Box, Typography, SxProps, Theme, useTheme } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";
import {
	CheckCircleOutline,
	InfoOutlined,
	WarningAmberOutlined,
	ErrorOutline,
} from "@mui/icons-material";

type Severity = "success" | "info" | "warning" | "error";

interface CustomAlertProps {
	severity?: Severity;
	label?: string;
	children?: React.ReactNode;
	icon?: ComponentType<SvgIconProps>;
	height?: string | number;
	fullWidth?: boolean;
	noBackground?: boolean;
	title?: string;
	sx?: SxProps<Theme>;
	slotProps?: {
		icon?: Partial<SvgIconProps>;
		title?: Partial<React.ComponentProps<typeof Typography>>;
		label?: Partial<React.ComponentProps<typeof Typography>>;
	};
}

const iconMap: Record<Severity, React.ComponentType> = {
	success: CheckCircleOutline,
	info: InfoOutlined,
	warning: WarningAmberOutlined,
	error: ErrorOutline,
};

const JumboAlertView: React.FC<CustomAlertProps> = ({
	severity,
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

	const getColor = (property: "main" | "light" | "contrastText") => {
		switch (severity) {
			case "success":
				return theme.palette.success[property];
			case "info":
				// 使用灰色作為預設
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
				// 若 severity 無效，使用灰色
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

	// 使用 useMemo 快取 boxStyles
	const boxStyles = useMemo(
		() =>
			noBackground
				? {
						backgroundColor: "transparent",
						border: "none",
				  }
				: {
						backgroundColor:
							theme.palette.mode === "dark"
								? lightColor
								: `${mainColor}1A`,
						border: `1px solid ${mainColor}`,
				  },
		[noBackground, theme.palette.mode, mainColor, lightColor]
	);

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
				...(fullWidth && {
					width: "100%",
				}),
				height,
				boxSizing: "border-box",
				...boxStyles,
				...sx,
			}}>
			{/* 大圖示，展開 slotProps.icon 到 IconComponent */}
			<IconComponent
				sx={{
					fontSize: 200,
					color: mainColor,
					...slotProps.icon?.sx,
				}}
				{...slotProps.icon}
			/>
			{/* 標題（如果有提供），使用 theme.palette.text.primary */}
			{title && (
				<Typography
					variant="h6"
					sx={{
						mt: 1,
						color: theme.palette.text.primary, // 使用主要文字顏色
						fontWeight: "bold",
						...slotProps.title?.sx,
					}}
					{...slotProps.title}>
					{title}
				</Typography>
			)}
			{/* 訊息：優先使用 children，若無則使用 label，使用 theme.palette.text.secondary */}
			<Typography
				variant="subtitle1"
				sx={{
					mt: title ? 1 : 2,
					color: theme.palette.text.secondary, // 使用次要文字顏色
					fontWeight: "medium",
					...slotProps.label?.sx,
				}}
				{...slotProps.label}>
				{children || label}
			</Typography>
		</Box>
	);
};

export default JumboAlertView;
