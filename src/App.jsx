import "react-toastify/dist/ReactToastify.css";
import "react-datasheet-grid/dist/style.css";
import "./App.css";

import {
	createTheme,
	CssBaseline,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import zhTW from "date-fns/locale/zh-TW";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { zhTW } from "date-fns/locale/zh-TW";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import zhTW from "dayjs/locale/zh-tw";
import { ToastContainer } from "react-toastify";

import { DialogsProvider } from "@/shared-contexts/dialog/DialogsProvider";
import { AppProvider } from "@/contexts/app/AppProvider";
import AppRoute from "@/routes/AppRoute";
import Colors from "@/modules/Colors.mjs";
import { ResponsiveProvider } from "@/shared-contexts/responsive/ResponsiveProvider";
import { useEffect } from "react";
import { useContext } from "react";
import ConfigContext from "./contexts/config/ConfigContext";
import { Suspense } from "react";
import LoadingTypography from "./shared-components/LoadingTypography";
// use palette from default theme
const { palette } = createTheme();

const theme = createTheme({
	typography: {
		fontFamily: ["微軟正黑體", "Roboto"].join(","),
		fontWeightBold: true,
	},
	// breakpoints: {
	// 	values: {
	// 		xs: 0,
	// 		sm: 600,
	// 		md: 960,
	// 		lg: 1300, // 自訂 lg 的起始寬度
	// 		xl: 1920,
	// 	},
	// },
	palette: {
		background: {
			default: Colors.BG,
		},
		primary: {
			main: Colors.PRIMARY,
			contrastText: Colors.CONTRAST_TEXT,
		},
		secondary: {
			main: Colors.SECONDARY,
		},
		success: {
			main: Colors.SUCCESS,
		},
		purple: {
			main: Colors.PURPLE,
			contrastText: "#fff",
		},
		"neutral-light": {
			main: "rgba(0, 0, 0, 0.2)",
			contrastText: "#000",
			dark: "rgba(0, 0, 0, 0.30)",
			light: "rgba(0, 0, 0, 0.10)",
		},
		neutral: {
			main: "rgba(0, 0, 0, 0.40)",
			contrastText: "#fff",
			dark: "rgba(0, 0, 0, 0.50)",
			light: "rgba(0, 0, 0, 0.30)",
		},
		"neutral-dark": {
			main: "rgba(0, 0, 0, 0.60)",
			contrastText: "#fff",
			dark: "rgba(0, 0, 0, 0.70)",
			light: "rgba(0, 0, 0, 0.50)",
		},
		black: {
			main: "rgba(0,0,0)",
			contrastText: "#fff",
		},
		white: {
			main: "#fff",
		},
	},
	components: {
		MuiAutocomplete: {
			styleOverrides: {
				groupLabel: {
					backgroundColor: Colors.BUTTON,
					fontSize: "1.0em",
					fontWeight: 600,
					lineHeight: "40px",
					color: "#fff",
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					// color: Colors.PRIMARY,
					// "& *": {
					// 	color: Colors.PRIMARY,
					// },
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					"&[disabled]": {
						color: palette.action.disabled,
						pointerEvents: "none",
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 4,
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					fontSize: '1rem',
					// fontWeight: 600,
				},
			},
		},
	},
});

function App() {
	const config = useContext(ConfigContext);

	useEffect(() => {
		// if (!["dev"].includes(import.meta.env.VITE_PROFILE)) {
		if (!["dev"].includes(config.PROFILE)) {
			const handleContextMenu = (event) => event.preventDefault();

			document.addEventListener("contextmenu", handleContextMenu);

			return () => {
				document.removeEventListener("contextmenu", handleContextMenu);
			};
		}
	}, []);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					adapterLocale={zhTW}>
					<ResponsiveProvider>
						<DialogsProvider buttonProps={{ size: "small" }}>
							<CssBaseline />
							<AppProvider>
								<Suspense fallback={<LoadingTypography>載入中...</LoadingTypography>}>
									<AppRoute />
								</Suspense>
							</AppProvider>
						</DialogsProvider>
					</ResponsiveProvider>
					<ToastContainer
						// theme="dark"
						theme="colored"
						// theme="light"
						hideProgressBar
						// position="top-center"
						position="bottom-right"
					// autoClose={3000} // 自動關閉時間（以毫秒為單位，例如 3000 毫秒 = 3 秒）
					// progressStyle={{ width: '100%' }}
					// progress={1}
					// position="top-right"
					/>
				</LocalizationProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
