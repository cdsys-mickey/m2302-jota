import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const DSGToolbarLabel = (props) => {
	const { label = "(LabelName)", name = "TxoAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	const _label = useMemo(() => {
		return label ? `${label}：` : "";
	}, [label])

	return (
		<FlexBox inline sx={{ fontWeight: 700 }}>
			{_label}
			<Typography color="primary" {...rest}>
				{formattedSubtotal}
			</Typography>
		</FlexBox>
	);
};

DSGToolbarLabel.propTypes = {
	name: PropTypes.string,
};

DSGToolbarLabel.displayName = "DSGToolbarLabel";
