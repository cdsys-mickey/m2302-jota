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
import Colors from "@/modules/md-colors";
import { ResponsiveProvider } from "@/shared-contexts/responsive/ResponsiveProvider";
// use palette from default theme
const { palette } = createTheme();

const theme = createTheme({
	typography: {
		fontFamily: ["微軟正黑體", "Roboto"].join(","),
		fontWeightBold: true,
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1300, // 自訂 lg 的起始寬度
			xl: 1920,
		},
	},
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
		},
		neutral: {
			main: "rgba(0, 0, 0, 0.40)",
			contrastText: "#fff",
		},
		"neutral-dark": {
			main: "rgba(0, 0, 0, 0.60)",
			contrastText: "#fff",
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
	},
});

function App() {
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
								<AppRoute />
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
