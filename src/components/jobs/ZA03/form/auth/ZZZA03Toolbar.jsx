import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { ZA03LockRowsSwitchContainer } from "./ZA03LockRowsSwitchContainer";
import ListToolbar from "../../../../../shared-components/listview/toolbar/ListToolbar";

const ZZZA03Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<Container maxWidth="md">
				<ListToolbar
					ref={ref}
					RightComponent={ZA03LockRowsSwitchContainer}
					// right={<Switch />}
					{...rest}
				/>
			</Container>
		);
	})
);

ZZZA03Toolbar.propTypes = {};

ZZZA03Toolbar.displayName = "ZZZA03Toolbar";
export default ZZZA03Toolbar;
