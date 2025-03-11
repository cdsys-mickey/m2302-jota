import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U02Context } from "@/modules/U02/U02Context";

export const U02FormButtonsContainer = () => {
	const u02 = useContext(U02Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u02.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U02FormButtonsContainer.displayName = "U02FormButtonsContainer";



