import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { G01Context } from "@/modules/G01/G01Context";

export const G01FormButtonsContainer = () => {
	const g01 = useContext(G01Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={g01.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

G01FormButtonsContainer.displayName = "G01FormButtonsContainer";




