import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import P21CreateButtonContainer from "./P21CreateButtonContainer";
import { P21FetchResultLabelContainer } from "./P21FetchResultLabelContainer";
import P21PrintButtonContainer from "./P21PrintButtonContainer";

const LeftButtons = memo(() => (
	<>
		<P21CreateButtonContainer />
		<P21PrintButtonContainer />
	</>
))

LeftButtons.displayName = "LeftButtons";

const P21Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={P21FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

P21Toolbar.displayName = "P21ListViewToolbar";
export default P21Toolbar;


