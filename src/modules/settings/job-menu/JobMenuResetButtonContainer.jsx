import ResponsiveLoadingButton from "@/shared-components/button/ResponsiveLoadingButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";

export const JobMenuResetButtonContainer = () => {
	const jobMenu = useContext(JobMenuContext);

	return (
		<ResponsiveLoadingButton
			variant="contained"
			color="warning"
			startIcon={<RestartAltIcon />}
			onClick={jobMenu.handleReset}>
			重設
		</ResponsiveLoadingButton>
	);
};

JobMenuResetButtonContainer.displayName = "JobMenuResetButtonContainer";
