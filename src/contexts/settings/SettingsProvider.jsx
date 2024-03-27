import { useContext } from "react";
import { usePersonalSettings } from "../../hooks/usePersonalSettings";
import { SettingsContext } from "./SettingsContext";
import PropTypes from "prop-types";
import { AuthContext } from "../auth/AuthContext";

export const SettingsProvider = ({ children }) => {
	const auth = useContext(AuthContext);
	const { token, operator } = auth;
	const settings = usePersonalSettings({ token, operator });

	return (
		<SettingsContext.Provider
			value={{
				...auth,
				...settings,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};

SettingsProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
