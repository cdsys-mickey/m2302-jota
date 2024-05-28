import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C06ProdGridSubtotalLabel = (props) => {
	const { name = "OrdAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			訂貨合計：
			<Typography color="primary" {...rest}>
				{subtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

C06ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

C06ProdGridSubtotalLabel.displayName = "C06ProdGridSubtotalLabel";
