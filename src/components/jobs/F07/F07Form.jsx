import { FormFieldLabel } from "@/shared-components";
import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const F07Form = memo((props) => {
	const { onSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12}>
								<FormFieldLabel
									// typo
									// editing={false}
									size="small"
									name="CutYM"
									label="結轉年月"
									// inline
									required
									readOnly
									slotProps={{
										"label": {
											sx: {
												marginTop: "-8px",
												marginLeft: "4px"
											}
										}
									}}
								/>
							</Grid>

						</Grid>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

F07Form.propTypes = {
	onSubmit: PropTypes.func,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

F07Form.displayName = "F07Form";
export default F07Form;

