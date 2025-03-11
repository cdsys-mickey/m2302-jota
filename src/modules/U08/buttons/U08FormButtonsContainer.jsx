import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U08Context } from "@/contexts/U08/U08Context";

export const U08FormButtonsContainer = () => {
	const u08 = useContext(U08Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u08.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U08FormButtonsContainer.displayName = "U08FormButtonsContainer";




