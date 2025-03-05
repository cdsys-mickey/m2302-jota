import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U04Context } from "@/modules/U04/U04Context";

export const U04FormButtonsContainer = () => {
	const u04 = useContext(U04Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u04.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U04FormButtonsContainer.displayName = "U04FormButtonsContainer";



