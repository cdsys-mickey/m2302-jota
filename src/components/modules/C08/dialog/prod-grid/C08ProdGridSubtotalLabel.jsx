import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C08ProdGridSubtotalLabel = (props) => {
	const { name = "TxoAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			撥出合計：
			<Typography color="primary" {...rest}>
				{subtotal}
			</Typography>
			{/* <FlexBox minWidth="80px" /> */}
		</FlexBox>
	);
};

C08ProdGridSubtotalLabel.propTypes = {
	name: PropTypes.string,
};

C08ProdGridSubtotalLabel.displayName = "C08ProdGridSubtotalLabel";
