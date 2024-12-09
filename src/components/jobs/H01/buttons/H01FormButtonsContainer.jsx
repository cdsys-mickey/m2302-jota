import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { H01Context } from "@/contexts/H01/H01Context";

export const H01FormButtonsContainer = () => {
	const h01 = useContext(H01Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={h01.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

H01FormButtonsContainer.displayName = "H01FormButtonsContainer";


