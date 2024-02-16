import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import { useContext } from "react";
import { A18Context } from "@/contexts/A18/A18Context";

export const A18FormButtonsContainer = () => {
	const a18 = useContext(A18Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={a18.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

A18FormButtonsContainer.displayName = "A18FormButtonsContainer";
