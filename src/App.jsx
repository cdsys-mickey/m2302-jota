import {
	createTheme,
	CssBaseline,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import zhTW from "date-fns/locale/zh-TW";

import { DialogsProvider } from "@/shared-contexts/dialog/DialogsProvider";
import { AppProvider } from "@/contexts/app/AppProvider";
import AppRoute from "@/routes/AppRoute";
import Colors from "@/modules/colors";
import { ResponsiveProvider } from "@/shared-contexts/responsive/ResponsiveProvider";
// use palette from default theme
const { palette } = createTheme();

const theme = createTheme({
	typography: {
		fontFamily: ["微軟正黑體", "Roboto"].join(","),
		fontWeightBold: true,
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
		neutral: {
			main: "rgba(0, 0, 0, 0.50)",
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
	},
});

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					locale={zhTW}>
					<ResponsiveProvider>
						<DialogsProvider ButtonProps={{ size: "small" }}>
							<CssBaseline />
							<AppProvider>
								<AppRoute />
							</AppProvider>
						</DialogsProvider>
					</ResponsiveProvider>
					<ToastContainer
						// theme="dark"
						theme="colored"
						// hideProgressBar
						// position="top-center"
						position="bottom-left"
						// position="top-right"
					/>
				</LocalizationProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
