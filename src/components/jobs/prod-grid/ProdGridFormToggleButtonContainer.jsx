import TuneIcon from "@mui/icons-material/Tune";
import { ToggleButton, Tooltip } from "@mui/material";
import { useContext, useMemo } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMoreButton from "../../../shared-components/ExpandMoreButton";

export const ProdGridFormToggleButtonContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);
	const title = useMemo(() => {
		return prodGrid.expanded ? "隱藏更多條件" : "顯示更多條件";
	}, [prodGrid.expanded]);
	return (
		<Tooltip title={title}>
			{/* <ToggleButton
				value="1"
				size="small"
				selected={prodGrid.expanded}
				onClick={prodGrid.toggleExpanded}
				{...rest}>
				{prodGrid.expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}

			</ToggleButton> */}
			<ExpandMoreButton expanded={prodGrid.expanded} onClick={prodGrid.toggleExpanded} {...rest}>
				<ExpandMoreIcon fontSize="small" />
			</ExpandMoreButton>
		</Tooltip>
	);
};

ProdGridFormToggleButtonContainer.displayName =
	"ProdGridFormToggleButtonContainer";
