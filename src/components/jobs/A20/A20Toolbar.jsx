import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import ModuleToolbar from "../ModuleToolbar";
import A20CreateButtonContainer from "./A20CreateButtonContainer";
import { A20FetchResultLabelContainer } from "./A20FetchResultLabelContainer";
import A20PrintButtonContainer from "./A20PrintButtonContainer";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";

const LeftButtons = memo(() => {
	return (
		<ModuleToolbar>
			<A20CreateButtonContainer />
			<A20PrintButtonContainer />
		</ModuleToolbar>
	);
});

LeftButtons.displayName = "LeftButtons";

const A20Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				pr={1}
				ref={ref}
				leftComponents={
					<>
						<A20CreateButtonContainer />
						<A20PrintButtonContainer />
					</>
				}
				// LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={A20FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

A20Toolbar.displayName = "A20ListViewToolbar";
export default A20Toolbar;
