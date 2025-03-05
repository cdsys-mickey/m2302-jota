import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { B06Context } from "@/contexts/B06/B06Context";

export const B06OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b06 = useContext(B06Context);
		const { canPrint } = b06;

		if (!canPrint) {
			return false;
		}

		return (
			<StdPrintOutputModePicker
				ref={ref}
				defaultValue={StdPrint.getDefaultOption()}
				width="9rem"
				required
				name="outputType"
				label=""
				dense
				{...rest}
			/>
		);
	})
);

B06OutputModePickerContainer.propTypes = {};

B06OutputModePickerContainer.displayName = "B06OutputModePickerContainer";
