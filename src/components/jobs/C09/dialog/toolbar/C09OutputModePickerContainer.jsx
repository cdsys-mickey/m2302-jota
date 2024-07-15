import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { C09Context } from "@/contexts/C09/C09Context";
import StdPrint from "@/modules/md-std-print";
import { forwardRef, memo, useContext } from "react";

export const C09OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c09 = useContext(C09Context);
		const { canPrint } = c09;

		if (!canPrint) {
			return false;
		}

		return (
			<StdPrintOutputModePicker
				ref={ref}
				defaultValue={StdPrint.getById(StdPrint.OutputModes.HTML)}
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

C09OutputModePickerContainer.propTypes = {};

C09OutputModePickerContainer.displayName = "C09OutputModePickerContainer";
