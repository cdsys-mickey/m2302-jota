import ConfigContext from "@/contexts/config/ConfigContext";
import { Link, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext } from "react";

const Copyright = ({ version, loading, apiVersion, handleCopyVersion }) => {
	const config = useContext(ConfigContext);

	return (
		<>
			<Typography variant="subtitle2" color="textSecondary" align="center">
				copyright©cdsys APP:
			</Typography>
			{/* <Typography variant="subtitle2" color="textSecondary" align="center"> */}
			<Link component="button" variant="subtitle2" onClick={handleCopyVersion} sx={{
				color: "text.secondary",
				textDecoration: 'none', // 可選：移除底線
				'&:hover': {
					textDecoration: 'underline', // 可選：滑鼠懸停時顯示底線
				},
			}}>
				{version || "(N/A)"}
			</Link>
			{/* </Typography> */}
			<Typography variant="subtitle2" color="textSecondary" align="center">
				{`${config.PROFILE
					? `[${config.PROFILE}]`
					: "[no profile]"
					},
			API: ${apiVersion || (loading ? "(系統啟動中...)" : "(N/A)")}`}
			</Typography>
		</>
	);
};

Copyright.propTypes = {
	version: PropTypes.string,
	loading: PropTypes.bool,
	apiVersion: PropTypes.string,
	handleCopyVersion: PropTypes.func
};

export default Copyright;
