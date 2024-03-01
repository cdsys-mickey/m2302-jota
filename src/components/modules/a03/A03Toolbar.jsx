import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A03LockRowsSwitchContainer } from "./A03LockRowsSwitchContainer";
import { Container } from "@mui/material";
import A03PrintButtonContainer from "./A03PrintButtonContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

const A03Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					leftComponents={
						<>
							<A03LockRowsSwitchContainer />
							<A03PrintButtonContainer />
						</>
					}
					// LeftComponent={A03LockRowsSwitchContainer}
					// RightComponent={A03PrintButtonContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A03Toolbar.propTypes = {};

A03Toolbar.displayName = "A03Toolbar";
export default A03Toolbar;
