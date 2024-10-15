import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/md-std-print";
import { useContext } from "react";
import { E03Context } from "@/contexts/E03/E03Context";

export const E03OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const e03 = useContext(E03Context);
		const { canPrint } = e03;

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

E03OutputModePickerContainer.propTypes = {};

E03OutputModePickerContainer.displayName = "E03OutputModePickerContainer";




