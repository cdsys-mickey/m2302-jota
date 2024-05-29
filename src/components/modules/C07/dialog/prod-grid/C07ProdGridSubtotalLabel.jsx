import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C07ProdGridSubtotalLabel = (props) => {
	const { name = "OrdAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			退貨合計：
			<Typography color="primary" {...rest}>
				{subtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

C07ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

C07ProdGridSubtotalLabel.displayName = "C07ProdGridSubtotalLabel";
