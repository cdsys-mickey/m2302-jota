import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { B031Context } from "@/contexts/B031/B031Context";

export const B031OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b031 = useContext(B031Context);
		const { canPrint } = b031;

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
				{...rest}
			/>
		);
	})
);

B031OutputModePickerContainer.propTypes = {};

B031OutputModePickerContainer.displayName = "B031OutputModePickerContainer";


