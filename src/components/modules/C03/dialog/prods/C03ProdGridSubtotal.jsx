import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

export const C03ProdGridSubtotalContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const { control } = useFormContext();
		const subtotal = useWatch({
			name: "OrdAmt_N",
			control,
		});

		return (
			<Typography ref={ref} {...rest}>
				合計: {subtotal}
			</Typography>
		);
	})
);

C03ProdGridSubtotalContainer.propTypes = {
	name: PropTypes.string.isRequired,
};

C03ProdGridSubtotalContainer.displayName = "C03ProdGridSubtotalContainer";
