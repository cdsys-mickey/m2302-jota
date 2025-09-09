import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import UserSettingEditorSaveButton from "./UserSettingEditorSaveButton";
import UserSettingEditorCancelButton from "./UserSettingEditorCancelButton";
import UserSettingEditorEditButton from "./UserSettingEditorEditButton";
import Colors from "@/modules/Colors.mjs";

const LeftButtons = memo(() => (
	<>
		<UserSettingEditorEditButton />
	</>
))
LeftButtons.displayName = "LeftButtons";

const RightButtons = memo(() => (
	<>
		<UserSettingEditorSaveButton />
		<UserSettingEditorCancelButton />
	</>
))
RightButtons.displayName = "RightButtons";


const UserSettingEditorToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			// <ContainerEx maxWidth="sm" alignLeft>
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				bgcolor={Colors.TOOLBAR}
				LeftComponent={UserSettingEditorEditButton}
				RightComponent={RightButtons}
				{...rest}
			/>
			// </ContainerEx>
		);
	})
);

UserSettingEditorToolbar.displayName = "UserSettingEditorToolbar";
export default UserSettingEditorToolbar;




