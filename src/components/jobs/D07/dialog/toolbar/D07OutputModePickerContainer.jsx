import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { D07Context } from "@/contexts/D07/D07Context";
import StdPrint from "@/modules/md-std-print";
import { forwardRef, memo, useContext } from "react";

export const D07OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c04 = useContext(D07Context);
		const { canPrint } = c04;

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

D07OutputModePickerContainer.propTypes = {};

D07OutputModePickerContainer.displayName = "D07OutputModePickerContainer";
