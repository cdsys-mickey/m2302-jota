import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import FormSectionTitle from "../../../shared-components/form/FormSectionTitle";
import FormSectionBox from "../../../shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";

export const RhfTabTestForm = memo(
	forwardRef((props, ref) => {
		const { text3Disabled, ...rest } = props;
		return (
			<form>
				<Box>
					<FormSectionTitle>React Hook Form</FormSectionTitle>
					<FormSectionBox p={1} mb={1}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={2}>
								<TextFieldWrapper
									name="text1"
									label="text1"
									size="small"
									labelShrink
									placeholder="欄位1"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} md={4}>
								<TextFieldWrapper
									name="text2"
									label="text2"
									fullWidth
									size="small"
									labelShrink
									placeholder="輸入數字右邊欄位才可用"
								/>
							</Grid>
							<Grid item xs={12} md={3}>
								<TextFieldWrapper
									name="text3"
									label="text3"
									size="small"
									labelShrink
									fullWidth
									placeholder="欄位3"
									disabled={text3Disabled}
								/>
							</Grid>
							<Grid item xs={12} md={3}>
								<TextFieldWrapper
									name="text4"
									label="text4"
									size="small"
									labelShrink
									placeholder="欄位4"
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
				</Box>
			</form>
		);
	})
);

RhfTabTestForm.propTypes = {
	text3Disabled: PropTypes.bool,
};

RhfTabTestForm.displayName = "RhfTabTestForm";
