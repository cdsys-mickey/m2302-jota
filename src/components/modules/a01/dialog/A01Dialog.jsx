import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import DialogEx from "../../../../shared-components/dialog/DialogEx";

const A01Dialog = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return <DialogEx ref={ref}></DialogEx>;
	})
);

A01Dialog.propTypes = {};

A01Dialog.displayName = "A01Dialog";
export default A01Dialog;
