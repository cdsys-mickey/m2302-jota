import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U061Context } from "@/contexts/U061/U061Context";

export const U06_1FormButtonsContainer = () => {
	const u061 = useContext(U061Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u061.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U06_1FormButtonsContainer.displayName = "U06_1FormButtonsContainer";




