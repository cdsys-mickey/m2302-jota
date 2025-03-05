import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U06Context } from "@/contexts/U06/U06Context";

export const U06FormButtonsContainer = () => {
	const u06 = useContext(U06Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u06.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U06FormButtonsContainer.displayName = "U06FormButtonsContainer";



