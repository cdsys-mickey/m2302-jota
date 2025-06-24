import { ButtonEx } from "@/shared-components";
import SaveIcon from '@mui/icons-material/Save';
import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";

export const JobMenuSaveButtonContainer = () => {
	const jobMenu = useContext(JobMenuContext);
	return (
		<ButtonEx
			responsive
			variant="contained"
			color="warning"
			startIcon={<SaveIcon />}
			onClick={jobMenu.handleSave}
			loading={jobMenu.saveWorking}>
			儲存
		</ButtonEx>
	);
};

JobMenuSaveButtonContainer.displayName =
	"JobMenuSaveButtonContainer";
