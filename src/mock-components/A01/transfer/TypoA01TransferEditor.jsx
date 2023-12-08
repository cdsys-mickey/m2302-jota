import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import React, { forwardRef, memo, useMemo } from "react";
import ControlledA01TransferEditor from "./ControlledA01TransferEditor";
import { TableContainer, Paper } from "@mui/material";
import A01TransferTable from "./A01TransferTable";

const TypoA01TransferPicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			value,
			label,
			// Typography
			renderText,
			emptyText = "(空白)",
			typoVariant = "body1",
			TypographyProps,
			// Input
			name,
			editing = true,
			size = "small",
			variant = "outlined",

			...rest
		} = props;

		if (!editing) {
			return <A01TransferTable data={value} />;
		}

		return (
			<ControlledA01TransferEditor
				ref={ref}
				label={label}
				name={name}
				variant={variant}
				size={size}
				fullWidth
				{...rest}
			/>
		);
	})
);

TypoA01TransferPicker.displayName = "TypoA01TransferPicker";

export default TypoA01TransferPicker;
