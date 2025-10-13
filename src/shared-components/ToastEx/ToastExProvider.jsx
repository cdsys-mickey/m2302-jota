import { useEffect, useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import ToastExContext from "./ToastExContext";

const ToastExProvider = (props) => {
	const { theme, ...rest } = props;
	const [_theme, setTheme] = useState(theme);

	const contextValue = useMemo(() => {
		return {
			theme: _theme
		}
	}, [_theme])

	useEffect(() => {
		setTheme(theme);
		console.log("toastEx theme changed →", theme)
	}, [theme]);

	return (
		<ToastExContext.Provider value={{ contextValue }}>
			<ToastContainer theme={_theme} {...rest} />
		</ToastExContext.Provider>
	)
}

ToastExProvider.displayName = "ToastExProvider";
export default ToastExProvider;