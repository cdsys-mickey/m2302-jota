import PropTypes from "prop-types";
import useUserSettingEditor from "../useUserSettingEditor";
import UserSettingEditorContext from "./UserSettingEditorContext";

const UserSettingEditorProvider = ({ moduleId, id, scope, children, ...rest }) => {
	const userSettingEditor = useUserSettingEditor({ moduleId, id, scope, ...rest });


	return (
		<UserSettingEditorContext.Provider
			value={{
				...userSettingEditor,
			}}>
			{children}
		</UserSettingEditorContext.Provider>
	);
};

UserSettingEditorProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	moduleId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	scope: PropTypes.string.isRequired,
}
export default UserSettingEditorProvider
