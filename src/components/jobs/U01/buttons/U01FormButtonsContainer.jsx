import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U01Context } from "@/contexts/U01/U01Context";

export const U01FormButtonsContainer = () => {
	const u01 = useContext(U01Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u01.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U01FormButtonsContainer.displayName = "U01FormButtonsContainer";


