import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U051Context } from "@/contexts/U051/U051Context";

export const U051FormButtonsContainer = () => {
	const u051 = useContext(U051Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u051.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U051FormButtonsContainer.displayName = "U051FormButtonsContainer";



