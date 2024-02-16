import { forwardRef, memo } from "react";
import ContainerEx from "../ContainerEx";
import InlineToolbar from "./InlineToolbar";

const EmptyToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineToolbar ref={ref} {...rest} />
			</ContainerEx>
		);
	})
);

EmptyToolbar.propTypes = {};

EmptyToolbar.displayName = "EmptyToolbar";
export default EmptyToolbar;
