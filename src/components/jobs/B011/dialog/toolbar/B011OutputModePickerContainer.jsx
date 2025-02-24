import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { B011Context } from "@/contexts/B011/B011Context";
import { B031Context } from "@/contexts/B031/B031Context";
import { BContext } from "@/contexts/B/BContext";

export const B011OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { forNew = false, ...rest } = props;
		const b = useContext(BContext);
		const b011 = useContext(b.forNew ? B031Context : B011Context);
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
				// dense
				disableClearable
				{...rest}
			/>
		);
	})
);

B011OutputModePickerContainer.propTypes = {
	forNew: PropTypes.bool
};

B011OutputModePickerContainer.displayName = "B011OutputModePickerContainer";

