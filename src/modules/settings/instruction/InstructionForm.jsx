import { CheckboxExField } from "@/shared-components";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const InstructionForm = memo((props) => {
	const { handleDownloadPromptChange, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<Box pt={3}>
				<form {...rest} noValidate>
					<CheckboxExField
						name="downloadPrompt"
						label="檔案下載前提示進行瀏覽器設定"
						onChange={handleDownloadPromptChange}
					/>
				</form>
			</Box>
		</ContainerEx>
	);
});

InstructionForm.propTypes = {
	handleDownloadPromptChange: PropTypes.func,
	loading: PropTypes.bool,
	verified: PropTypes.bool,
};

InstructionForm.displayName = "InstructionForm";
export default InstructionForm;
