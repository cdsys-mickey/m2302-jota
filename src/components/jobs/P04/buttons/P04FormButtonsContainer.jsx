import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { P04Context } from "@/contexts/P04/P04Context";

export const P04FormButtonsContainer = () => {
	const p04 = useContext(P04Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={p04.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

P04FormButtonsContainer.displayName = "P04FormButtonsContainer";


