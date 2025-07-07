import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import Colors from "../Colors.mjs";
import { P38LockRowsSwitchContainer } from "./toolbar/P38LockRowsSwitchContainer";
import P38SaveButton from "./toolbar/P38SaveButton";
import P38CancelButton from "./toolbar/P38CancelButton";
import P38EditButton from "./toolbar/P38EditButton";

const LeftButtons = memo(() => (
	<>
		<P38EditButton />
		<P38SaveButton />
		<P38CancelButton />
		{/* <P41PrintButtonContainer /> */}
	</>
))
LeftButtons.displayName = "LeftButtons";

const RightButtons = memo(() => (
	<>
		<P38SaveButton />
		<P38CancelButton />
	</>
))
RightButtons.displayName = "RightButtons";


const P38Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			// <ContainerEx maxWidth="sm" alignLeft>
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				bgcolor={Colors.TOOLBAR}
				LeftComponent={P38EditButton}
				RightComponent={RightButtons}
				{...rest}
			/>
			// </ContainerEx>
		);
	})
);

P38Toolbar.displayName = "P38Toolbar";
export default P38Toolbar;




