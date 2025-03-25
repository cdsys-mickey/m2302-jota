import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { P14Context } from "@/modules/P14/P14Context";

export const P14OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const p14 = useContext(P14Context);
		const { canPrint } = p14;

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

P14OutputModePickerContainer.propTypes = {};

P14OutputModePickerContainer.displayName = "P14OutputModePickerContainer";


