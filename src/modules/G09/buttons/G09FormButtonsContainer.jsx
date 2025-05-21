import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { G09Context } from "@/modules/G09/G09Context";

export const G09FormButtonsContainer = () => {
	const g09 = useContext(G09Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={g09.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

G09FormButtonsContainer.displayName = "G09FormButtonsContainer";






