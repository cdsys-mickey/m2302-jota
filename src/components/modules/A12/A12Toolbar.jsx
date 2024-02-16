import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A12LockRowsSwitchContainer } from "./A12LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

const A12Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A12LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A12Toolbar.propTypes = {};

A12Toolbar.displayName = "A12Toolbar";
export default A12Toolbar;
