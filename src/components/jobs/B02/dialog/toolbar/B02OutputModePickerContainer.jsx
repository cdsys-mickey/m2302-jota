import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { B02Context } from "@/contexts/B02/B02Context";
import { BContext } from "@/contexts/B/BContext";
import { B04Context } from "@/contexts/B04/B04Context";

export const B02OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b = useContext(BContext);
		const b02 = useContext(b.forNew ? B04Context : B02Context);
		const { canPrint } = b02;

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

B02OutputModePickerContainer.propTypes = {};

B02OutputModePickerContainer.displayName = "B02OutputModePickerContainer";


