import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import { D02Context } from "@/contexts/D02/D02Context";
import StdPrint from "@/modules/md-std-print";
import { forwardRef, memo, useContext } from "react";

export const D02OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c04 = useContext(D02Context);
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

D02OutputModePickerContainer.propTypes = {};

D02OutputModePickerContainer.displayName = "D02OutputModePickerContainer";
