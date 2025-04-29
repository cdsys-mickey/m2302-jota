import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { G05Context } from "@/modules/G05/G05Context";

export const G05FormButtonsContainer = () => {
	const g05 = useContext(G05Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={g05.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

G05FormButtonsContainer.displayName = "G05FormButtonsContainer";





