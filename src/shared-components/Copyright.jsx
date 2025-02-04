import ConfigContext from "@/contexts/config/ConfigContext";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";

const Copyright = ({ version, loading, apiVersion }) => {
	const config = useContext(ConfigContext);

	return (
		<Typography variant="subtitle2" color="textSecondary" align="center">
			{`copyright©cdsys APP: ${version || "(N/A)"}${
				// import.meta.env.VITE_PROFILE
				config.PROFILE
					// ? `[${import.meta.env.VITE_PROFILE}]`
					? `[${config.PROFILE}]`
					: "[no profile]"
				},
			API: ${apiVersion || (loading ? "(系統啟動中...)" : "(N/A)")}`}
		</Typography>
	);
};

Copyright.propTypes = {
	version: PropTypes.string,
	loading: PropTypes.bool,
	apiVersion: PropTypes.string,
};

export default Copyright;
