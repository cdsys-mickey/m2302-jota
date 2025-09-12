import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { memo } from "react";
import UserSettingEditorToolbar from "../toolbar/UserSettingEditorToolbar";
import UserSettingEditorGridContainer from "../grid/UserSettingEditorGridContainer";

const UserSettingEditorFormView = memo((props) => {
	const { ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<FormBox {...rest}>
				<form>
					<FormSectionBox pt={1}>
						<Box mb={0.5}>
							<UserSettingEditorToolbar />
						</Box>
						<UserSettingEditorGridContainer slotProps={{
							box: {
								// mt: 1,
								// width: "600px"
							}
						}} />
						{/* </FlexBox> */}
					</FormSectionBox>
				</form>
			</FormBox>
		</ContainerEx >
	);
})

UserSettingEditorFormView.propTypes = {
	loadError: PropTypes.object,
	slotProps: PropTypes.object
}

UserSettingEditorFormView.displayName = "UserSettingEditorFormView";
export default UserSettingEditorFormView;
