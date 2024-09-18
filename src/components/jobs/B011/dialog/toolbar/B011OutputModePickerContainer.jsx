import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/md-std-print";
import { useContext } from "react";
import { B011Context } from "@/contexts/B011/B011Context";

export const B011OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b011 = useContext(B011Context);
		const { canPrint } = b011;

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
				{...rest}
			/>
		);
	})
);

B011OutputModePickerContainer.propTypes = {};

B011OutputModePickerContainer.displayName = "B011OutputModePickerContainer";

