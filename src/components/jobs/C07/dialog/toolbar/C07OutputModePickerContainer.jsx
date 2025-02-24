import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { C07Context } from "@/contexts/C07/C07Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const C07OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c07 = useContext(C07Context);
		const { canPrint } = c07;

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

C07OutputModePickerContainer.propTypes = {};

C07OutputModePickerContainer.displayName = "C07OutputModePickerContainer";
