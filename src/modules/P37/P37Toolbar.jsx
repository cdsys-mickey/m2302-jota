import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";

const LeftButtons = memo(() => (
	<>
		{/* <P41CreateButtonContainer />
		<P41PrintButtonContainer /> */}
	</>
))

LeftButtons.displayName = "LeftButtons";

const P37Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				// LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				// RightComponent={P37FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

P37Toolbar.displayName = "P37Toolbar";
export default P37Toolbar;



