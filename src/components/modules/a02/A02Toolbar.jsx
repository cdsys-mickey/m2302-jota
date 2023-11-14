import { memo } from "react";
import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import Android12Switch from "../../../shared-components/Android12Switch";
import { Container, Switch } from "@mui/material";
import SwitchEx from "../../../shared-components/SwitchEx";

const A02Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="xs">
				<InlineListViewToolbar
					ref={ref}
					right={
						<SwitchEx label="編輯鎖定" checkedLabel="編輯模式" />
					}
					// right={<Switch />}
					{...rest}
				/>
			</Container>
		);
	})
);

A02Toolbar.propTypes = {};

A02Toolbar.displayName = "A02Toolbar";
export default A02Toolbar;
