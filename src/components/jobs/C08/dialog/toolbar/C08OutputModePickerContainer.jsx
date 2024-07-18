import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { C08Context } from "@/contexts/C08/C08Context";
import StdPrint from "@/modules/md-std-print";
import { forwardRef, memo, useContext } from "react";

export const C08OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c08 = useContext(C08Context);
		const { canPrint } = c08;

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

C08OutputModePickerContainer.propTypes = {};

C08OutputModePickerContainer.displayName = "C08OutputModePickerContainer";
