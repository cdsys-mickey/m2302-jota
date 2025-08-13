import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import { REBContext } from "@/modules/REB/REBContext";

export const REBFormButtonsContainer = () => {
	const reb = useContext(REBContext);
	return (
		<>
			<ResponsiveButton
				startIcon={<OpenInNewIcon />}
				variant="contained"
				color="primary"
				onClick={reb.handleSubmit}>
				執行
			</ResponsiveButton>
		</>
	);
};

REBFormButtonsContainer.displayName = "REBFormButtonsContainer";









