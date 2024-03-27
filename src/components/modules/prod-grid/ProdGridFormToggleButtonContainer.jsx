import TuneIcon from "@mui/icons-material/Tune";
import { ToggleButton, Tooltip } from "@mui/material";
import { useContext, useMemo } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";

export const ProdGridFormToggleButtonContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);
	const title = useMemo(() => {
		return prodGrid.expanded ? "隱藏更多條件" : "顯示更多條件";
	}, [prodGrid.expanded]);
	return (
		<Tooltip title={title}>
			<ToggleButton
				value="1"
				size="small"
				selected={prodGrid.expanded}
				onClick={prodGrid.toggleExpanded}
				{...rest}>
				<TuneIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
	);
};

ProdGridFormToggleButtonContainer.displayName =
	"ProdGridFormToggleButtonContainer";
