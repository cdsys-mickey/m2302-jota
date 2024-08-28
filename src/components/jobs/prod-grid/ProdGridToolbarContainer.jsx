import { useContext } from "react";
import ProdGridToolbar from "./ProdGridToolbar";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";

export const ProdGridToolbarContainer = (props) => {
	const { variant = "rectangular",
		animation = "pulse", ...rest } = props;
	const prodGrid = useContext(ProdGridContext);

	if (prodGrid.gridLoading) {
		return (
			<Skeleton
				variant={variant}
				animation={animation}
				height={20}
			/>
		);
	}

	if (prodGrid.gridLoading == null) {
		return false;
	}

	return <ProdGridToolbar {...rest} />;
};

ProdGridToolbarContainer.displayName = "ProdGridToolbarContainer";
ProdGridToolbarContainer.propTypes = {
	variant: PropTypes.string,
	animation: PropTypes.string,
}
