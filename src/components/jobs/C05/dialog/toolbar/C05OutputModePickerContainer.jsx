import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { C05Context } from "@/contexts/C05/C05Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const C05OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c05 = useContext(C05Context);
		const { canPrint } = c05;

		if (!canPrint) {
			return false;
		}

		return (
			<StdPrintOutputModePicker
				ref={ref}
				defaultValue={StdPrint.findById(StdPrint.OutputModes.HTML)}
				width="8rem"
				required
				name="outputType"
				label=""
				dense
				disableClearable
				autoComplete
				autoSelect
				{...rest}
			/>
		);
	})
);

C05OutputModePickerContainer.propTypes = {};

C05OutputModePickerContainer.displayName = "C05OutputModePickerContainer";
