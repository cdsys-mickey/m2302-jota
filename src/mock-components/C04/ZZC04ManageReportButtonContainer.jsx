import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import React from "react";
import ButtonEx from "@/shared-components/button/ButtonEx";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";

export const C04ManageReportButtonContainer = React.forwardRef(
	({ ...rest }, ref) => {
		return (
			<ResponsiveButton
				ref={ref}
				mobileText="管理"
				variant="contained"
				color="neutral"
				endIcon={<SettingsApplicationsIcon />}
				sx={{
					fontWeight: 600,
				}}>
				報表管理
			</ResponsiveButton>
		);
	}
);
