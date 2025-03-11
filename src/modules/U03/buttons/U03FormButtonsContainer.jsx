import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U03Context } from "@/modules/U03/U03Context";

export const U03FormButtonsContainer = () => {
	const u03 = useContext(U03Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u03.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U03FormButtonsContainer.displayName = "U03FormButtonsContainer";



