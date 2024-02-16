import TuneIcon from "@mui/icons-material/Tune";
import { ToggleButton, Tooltip } from "@mui/material";
import { useContext, useMemo } from "react";
import { A22Context } from "@/contexts/A22/A22Context";

export const A22GridFormToggleButtonContainer = () => {
	const a22 = useContext(A22Context);
	const title = useMemo(() => {
		return a22.expanded ? "隱藏更多條件" : "顯示更多條件";
	}, [a22.expanded]);
	return (
		<Tooltip title={title}>
			<ToggleButton
				value="1"
				color="warning"
				size="small"
				selected={a22.expanded}
				onClick={a22.toggleExpanded}>
				<TuneIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
	);
};

A22GridFormToggleButtonContainer.displayName =
	"A22GridFormToggleButtonContainer";
