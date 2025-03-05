import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { D01Context } from "@/contexts/D01/D01Context";
import StdPrint from "@/modules/StdPrint.mjs";
import { forwardRef, memo, useContext } from "react";

export const D01OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c04 = useContext(D01Context);
		const { canPrint } = c04;

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

D01OutputModePickerContainer.propTypes = {};

D01OutputModePickerContainer.displayName = "D01OutputModePickerContainer";
