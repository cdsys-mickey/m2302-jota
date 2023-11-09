import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const Copyright = ({ version, loading, apiVersion }) => {
	return (
		<Typography variant="subtitle2" color="textSecondary" align="center">
			{`copyright©cdsys APP: ${version || "(N/A)"}${
				import.meta.env.VITE_PROFILE
					? `[${import.meta.env.VITE_PROFILE}]`
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
