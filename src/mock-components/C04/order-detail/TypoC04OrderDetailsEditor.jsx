import React, { forwardRef, memo } from "react";
import C04OrderDetailTable from "../detail/C04OrderDetailTable";
import C04TransferEditorControlled from "./C04OrderDetailEditorControlled";

const TypoC04OrderDetailPicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			value,
			label,
			// Typography
			renderText,
			emptyText = "(空白)",
			typoVariant = "body1",
			typographyProps,
			// Input
			name,
			editing = true,
			size = "small",
			variant = "outlined",

			...rest
		} = props;

		if (!editing) {
			return <C04OrderDetailTable data={value} />;
		}

		return (
			<C04TransferEditorControlled
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

TypoC04OrderDetailPicker.displayName = "TypoC04OrderDetailPicker";

export default TypoC04OrderDetailPicker;
