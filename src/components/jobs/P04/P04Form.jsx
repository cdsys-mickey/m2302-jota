import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";
import TerminalPicker from "@/components/terminal-picker/TerminalPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import Auth from "@/modules/md-auth";

const P04Form = memo((props) => {
	const { onSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="SDate"
									label="交易日期起"
									fullWidth
									validate
									clearable
									autoFocus
									required
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="EDate"
									label="交易日期迄"
									fullWidth
									validate
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TerminalPicker
									name="SPosNo"
									label="收銀機號"
									size="small"
									virtualize
									disableOpenOnInput
									selectOnFocus
									scope={Auth.SCOPES.DEPT}
								// required
								// rules={{
								// 	required: "收銀機號為必填"
								// }}
								/>
							</Grid>
						</Grid>
						<Grid container>
							<FlexGrid item xs={12} sm={6} alignItems="center">
								{/* <CheckboxExWrapper
									label="包含撥出入"
									name="transIncluded"
									defaultValue={true}
								/> */}
							</FlexGrid>
							<Grid item xs={12} sm={6}>
								<FlexToolbar align="right">
									<ReportSubmitButtonContainer
										onClick={onSubmit} />
								</FlexToolbar>
							</Grid>
						</Grid>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

P04Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

P04Form.displayName = "P04Form";
export default P04Form;


