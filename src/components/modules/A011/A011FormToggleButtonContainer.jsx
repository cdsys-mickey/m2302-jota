import TuneIcon from "@mui/icons-material/Tune";
import { ToggleButton, Tooltip } from "@mui/material";
import { useContext } from "react";
import { A011Context } from "../../../contexts/A011/A011Context";
import { useMemo } from "react";

export const A011FormToggleButtonContainer = () => {
	const a011 = useContext(A011Context);
	const title = useMemo(() => {
		return a011.expanded ? "隱藏更多條件" : "顯示更多條件";
	}, [a011.expanded]);
	return (
		<Tooltip title={title}>
			<ToggleButton
				value="1"
				color="warning"
				size="small"
				selected={a011.expanded}
				onClick={a011.toggleExpanded}>
				<TuneIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
	);
};

A011FormToggleButtonContainer.displayName = "A011FormToggleButtonContainer";
