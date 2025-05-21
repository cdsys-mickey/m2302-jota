import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { G07Context } from "@/modules/G07/G07Context";

export const G07FormButtonsContainer = () => {
	const g07 = useContext(G07Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={g07.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

G07FormButtonsContainer.displayName = "G07FormButtonsContainer";








