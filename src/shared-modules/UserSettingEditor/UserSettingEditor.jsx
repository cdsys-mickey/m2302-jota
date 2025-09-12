import PropTypes from "prop-types";
import { memo } from "react";
import UserSettingEditorProvider from "./context/UserSettingEditorProvider";
import UserSettingEditorFormContainer from "./form/UserSettingEditorFormContainer";

const UserSettingEditor = memo((props) => {
	const { id, scope, ...rest } = props;
	return (
		<UserSettingEditorProvider id={id} scope={scope} {...rest}>
			<UserSettingEditorFormContainer />
		</UserSettingEditorProvider>
	);
})

UserSettingEditor.propTypes = {
	id: PropTypes.string.isRequired,
	scope: PropTypes.string.isRequired,
}

UserSettingEditor.displayName = "UserSettingEditor";
export default UserSettingEditor;