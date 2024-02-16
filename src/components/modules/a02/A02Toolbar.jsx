import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A02LockRowsSwitchContainer } from "./A02LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

const A02Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A02LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A02Toolbar.propTypes = {};

A02Toolbar.displayName = "A02Toolbar";
export default A02Toolbar;
