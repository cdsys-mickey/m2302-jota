import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import { useContext } from "react";
import { A21Context } from "@/contexts/A21/A21Context";

export const A21FormButtonsContainer = () => {
	const a21 = useContext(A21Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={a21.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

A21FormButtonsContainer.displayName = "A21FormButtonsContainer";
