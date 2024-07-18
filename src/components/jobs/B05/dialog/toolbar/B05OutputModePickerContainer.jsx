import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/md-std-print";
import { useContext } from "react";
import { B05Context } from "@/contexts/B05/B05Context";

export const B05OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b05 = useContext(B05Context);
		const { canPrint } = b05;

		if (!canPrint) {
			return false;
		}

		return (
			<StdPrintOutputModePicker
				ref={ref}
				defaultValue={StdPrint.findById(StdPrint.OutputModes.HTML)}
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

B05OutputModePickerContainer.propTypes = {};

B05OutputModePickerContainer.displayName = "B05OutputModePickerContainer";
