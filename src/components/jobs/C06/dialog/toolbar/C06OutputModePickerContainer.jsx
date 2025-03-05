import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { C06Context } from "@/contexts/C06/C06Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const C06OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c06 = useContext(C06Context);
		const { canPrint } = c06;

		if (!canPrint) {
			return false;
		}

		return (
			<StdPrintOutputModePicker
				ref={ref}
				defaultValue={StdPrint.getDefaultOption()}
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

C06OutputModePickerContainer.propTypes = {};

C06OutputModePickerContainer.displayName = "C06OutputModePickerContainer";
