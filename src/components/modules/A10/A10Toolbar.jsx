import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A10LockRowsSwitchContainer } from "./A10LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

const A10Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A10LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A10Toolbar.propTypes = {};

A10Toolbar.displayName = "A10Toolbar";
export default A10Toolbar;
