import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { U07Context } from "@/contexts/U07/U07Context";

export const U07FormButtonsContainer = () => {
	const u07 = useContext(U07Context);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={u07.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

U07FormButtonsContainer.displayName = "U07FormButtonsContainer";




