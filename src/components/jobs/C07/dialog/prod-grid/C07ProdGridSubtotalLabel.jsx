import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const C07ProdGridSubtotalLabel = (props) => {
	const { name = "OrdAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			訂貨合計：
			<Typography color="primary" {...rest}>
				{formattedSubtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

C07ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

C07ProdGridSubtotalLabel.displayName = "C07ProdGridSubtotalLabel";
