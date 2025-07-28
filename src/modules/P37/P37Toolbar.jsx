import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import Colors from "../Colors.mjs";
import { P37LockRowsSwitchContainer } from "./toolbar/P37LockRowsSwitchContainer";
import P37SaveButton from "./toolbar/P37SaveButton";
import P37CancelButton from "./toolbar/P37CancelButton";
import P37EditButton from "./toolbar/P37EditButton";

const LeftButtons = memo(() => (
	<>
		<P37EditButton />
		{/* <P37SaveButton /> */}
		{/* <P37CancelButton /> */}
		{/* <P41PrintButtonContainer /> */}
	</>
))
LeftButtons.displayName = "LeftButtons";

const RightButtons = memo(() => (
	<>
		<P37EditButton />
		<P37SaveButton />
		<P37CancelButton />
	</>
))
RightButtons.displayName = "RightButtons";


const P37Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			// <ContainerEx maxWidth="sm" alignLeft>
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				bgcolor={Colors.TOOLBAR}
				// LeftComponent={P37EditButton}
				RightComponent={RightButtons}
				{...rest}
			/>
			// </ContainerEx>
		);
	})
);

P37Toolbar.displayName = "P37Toolbar";
export default P37Toolbar;



