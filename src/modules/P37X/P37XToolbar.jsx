import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import Colors from "../Colors.mjs";
import { P37XLockRowsSwitchContainer } from "./toolbar/P37XLockRowsSwitchContainer";
import P37XSaveButton from "./toolbar/P37XSaveButton";
import P37XCancelButton from "./toolbar/P37XCancelButton";
import P37XEditButton from "./toolbar/P37XEditButton";

const LeftButtons = memo(() => (
	<>
		<P37XEditButton />
		{/* <P37XSaveButton /> */}
		{/* <P37XCancelButton /> */}
		{/* <P41PrintButtonContainer /> */}
	</>
))
LeftButtons.displayName = "LeftButtons";

const RightButtons = memo(() => (
	<>
		<P37XSaveButton />
		<P37XCancelButton />
	</>
))
RightButtons.displayName = "RightButtons";


const P37XToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			// <ContainerEx maxWidth="sm" alignLeft>
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				bgcolor={Colors.TOOLBAR}
				LeftComponent={P37XEditButton}
				RightComponent={RightButtons}
				{...rest}
			/>
			// </ContainerEx>
		);
	})
);

P37XToolbar.displayName = "P37XToolbar";
export default P37XToolbar;




