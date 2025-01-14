import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { H02Context } from "@/modules/H02/H02Context";

export const H02FormButtonsContainer = () => {
	const h02 = useContext(H02Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={h02.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

H02FormButtonsContainer.displayName = "H02FormButtonsContainer";



