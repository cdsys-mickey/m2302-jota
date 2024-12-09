import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { P02Context } from "@/contexts/P02/P02Context";

export const P02FormButtonsContainer = () => {
	const p02 = useContext(P02Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={p02.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

P02FormButtonsContainer.displayName = "P02FormButtonsContainer";

