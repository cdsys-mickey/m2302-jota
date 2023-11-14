import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import SwitchEx from "../../../shared-components/SwitchEx";

const A03Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			// <Container maxWidth="sm">
			<InlineListViewToolbar
				ref={ref}
				right={<SwitchEx label="編輯鎖定" checkedLabel="編輯模式" />}
				// right={<Switch />}
				{...rest}
			/>
			// </Container>
		);
	})
);

A03Toolbar.propTypes = {};

A03Toolbar.displayName = "A03Toolbar";
export default A03Toolbar;
