import React, { forwardRef, memo } from "react";
import A01TransferTable from "./A01TransferTable";
import ControlledA01TransferEditor from "./ControlledA01TransferEditor";

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
			typoProps,
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
