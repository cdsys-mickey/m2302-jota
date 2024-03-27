import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container, Toolbar } from "@mui/material";
import { forwardRef, memo } from "react";
import { A17FormButtonsContainer } from "./buttons/A17FormButtonsContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const A17Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<FlexToolbar
					ref={ref}
					LeftComponent={A17FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A17Toolbar.propTypes = {};

A17Toolbar.displayName = "A17Toolbar";
export default A17Toolbar;
