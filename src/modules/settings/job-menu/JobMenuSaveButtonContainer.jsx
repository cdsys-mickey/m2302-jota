import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import SaveIcon from '@mui/icons-material/Save';
import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";

export const JobMenuSaveButtonContainer = () => {
	const jobMenu = useContext(JobMenuContext);
	return (
		<ButtonWrapper
			responsive
			variant="contained"
			color="warning"
			startIcon={<SaveIcon />}
			onClick={jobMenu.handleSave}
			loading={jobMenu.saveWorking}>
			儲存
		</ButtonWrapper>
	);
};

JobMenuSaveButtonContainer.displayName =
	"JobMenuSaveButtonContainer";
