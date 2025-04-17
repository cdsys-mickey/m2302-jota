import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import StdPrint from "@/modules/StdPrint.mjs";
import { useContext } from "react";
import { G02Context } from "@/modules/G02/G02Context";

export const G02OutputModePickerContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g02 = useContext(G02Context);
		const { canPrint } = g02;

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

G02OutputModePickerContainer.propTypes = {};

G02OutputModePickerContainer.displayName = "G02OutputModePickerContainer";

