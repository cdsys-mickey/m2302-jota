import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A26LockRowsSwitchContainer } from "./A26LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

const A26Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A26LockRowsSwitchContainer}
					// right={<Switch />}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A26Toolbar.propTypes = {};

A26Toolbar.displayName = "A26Toolbar";
export default A26Toolbar;
