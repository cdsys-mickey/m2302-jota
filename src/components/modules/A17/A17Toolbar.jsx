import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A17FormButtonsContainer } from "./buttons/A17FormButtonsContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

const A17Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
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
