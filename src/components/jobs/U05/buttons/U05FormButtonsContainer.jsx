import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U05Context } from "@/contexts/U05/U05Context";

export const U05FormButtonsContainer = () => {
	const u05 = useContext(U05Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u05.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U05FormButtonsContainer.displayName = "U05FormButtonsContainer";


