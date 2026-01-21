import ContainerEx from "@/shared-components/ContainerEx";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const F05Form = memo((props) => {
	const { onSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12}>
								<DatePickerWrapper label="電腦資料產生日期"
									// inline
									typo
									name="ActDate"
									editing={false}
								/>
								{/* <TextFieldWrapper
									typo
									editing={false}
									size="small"
									name="ActDate"
									label="電腦資料產生日期"
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
								/> */}
							</Grid>
							<Grid item xs={12} sm={12}>
								<TextFieldWrapper
									typo
									editing={false}
									size="small"
									name="PhyIDs"
									label="清單"
									// inline
									required
									readOnly
								// slotProps={{
								// 	"label": {
								// 		sx: {
								// 			marginTop: "-8px",
								// 			marginLeft: "4px"
								// 		}
								// 	}
								// }}
								/>
							</Grid>

						</Grid>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

F05Form.propTypes = {
	onSubmit: PropTypes.func,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

F05Form.displayName = "F05Form";
export default F05Form;

