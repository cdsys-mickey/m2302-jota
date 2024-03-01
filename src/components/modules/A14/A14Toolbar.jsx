import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A14LockRowsSwitchContainer } from "./A14LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A14PrintButtonContainer from "./A14PrintButtonContainer";

const A14Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A14LockRowsSwitchContainer}
					RightComponent={A14PrintButtonContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A14Toolbar.propTypes = {};

A14Toolbar.displayName = "A14Toolbar";
export default A14Toolbar;
