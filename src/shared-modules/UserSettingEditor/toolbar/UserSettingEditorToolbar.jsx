import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import UserSettingEditorSaveButton from "./UserSettingEditorSaveButton";
import UserSettingEditorCancelButton from "./UserSettingEditorCancelButton";
import UserSettingEditorEditButton from "./UserSettingEditorEditButton";
import Colors from "@/modules/Colors.mjs";

const LeftButtons = memo(() => (
	<>
		<UserSettingEditorEditButton />
		<UserSettingEditorSaveButton />
		<UserSettingEditorCancelButton />
	</>
))
LeftButtons.displayName = "LeftButtons";

const RightButtons = memo(() => (
	<>

	</>
))
RightButtons.displayName = "RightButtons";


const UserSettingEditorToolbar = memo(
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

UserSettingEditorToolbar.displayName = "UserSettingEditorToolbar";
export default UserSettingEditorToolbar;




