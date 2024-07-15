import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { A19Context } from "@/contexts/A19/A19Context";

export const A19FormButtonsContainer = () => {
	const a19 = useContext(A19Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={a19.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

A19FormButtonsContainer.displayName = "A19FormButtonsContainer";
