import { ButtonEx } from "@/shared-components";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";

export const JobMenuResetButtonContainer = () => {
	const jobMenu = useContext(JobMenuContext);

	return (
		<ButtonEx
			variant="contained"
			color="warning"
			startIcon={<RestartAltIcon />}
			onClick={jobMenu.handleReset}>
			重設
		</ButtonEx>
	);
};

JobMenuResetButtonContainer.displayName = "JobMenuResetButtonContainer";
