import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import Colors from "../../../Colors.mjs";
import P38SaveButton from "./toolbar/P38SaveButton";
import P38CancelButton from "./toolbar/P38CancelButton";
import P38EditButton from "./toolbar/P38EditButton";

const LeftButtons = memo(() => (
	<>
		<P38EditButton />
		<P38SaveButton />
		<P38CancelButton />
	</>
))
LeftButtons.displayName = "LeftButtons";

const RightButtons = memo(() => (
	<>

	</>
))
RightButtons.displayName = "RightButtons";


const P38TitleToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			// <ContainerEx maxWidth="sm" alignLeft>
			<ToolbarEx
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				bgcolor={Colors.TOOLBAR}
				LeftComponent={LeftButtons}
				RightComponent={RightButtons}
				{...rest}
			/>
			// </ContainerEx>
		);
	})
);

P38TitleToolbar.displayName = "P38TitleToolbar";
export default P38TitleToolbar;




