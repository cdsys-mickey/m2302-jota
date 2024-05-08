import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { C04Context } from "@/contexts/C04/C04Context";
import StdPrint from "@/modules/md-std-print";
import { forwardRef, memo, useContext } from "react";

export const C04OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c03 = useContext(C04Context);
		const { canPrint } = c03;

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

C04OutputModePickerContainer.propTypes = {};

C04OutputModePickerContainer.displayName = "C04OutputModePickerContainer";
