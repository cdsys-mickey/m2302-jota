import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import AppDeptPicker from "@/components/fields/AppDeptPicker";
import { RealFilePicker } from "@/components/picker/RealFilePicker";
import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import A18ActionPicker from "./picker/A18ActionPicker";

const A18Form = memo((props) => {
	const { onSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12}>
								<AppDeptPicker
									filterByOperator
									label="查詢門市"
									required
									name="dept"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>

							<Grid item xs={12}>
								<RealFilePicker
									name="table"
									label="檔案"
									// required
									// name="RealFile"
									size="small"
									// disableOpenOnInput
									selectOnFocus
								/>
							</Grid>

							<Grid item xs={12}>
								<StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/>
							</Grid>

							<Grid item xs={12}>
								<DatePickerWrapper
									name="SDate"
									label="起始日期"
								/>
							</Grid>
							<Grid item xs={12}>
								<DatePickerWrapper
									name="EDate"
									label="截止日期"
								/>
							</Grid>
							<Grid item xs={12}>
								<A18ActionPicker name="action" label="行為" />
							</Grid>

							<FlexToolbar align="right">
								{/* <A18FormButtonsContainer /> */}
								<ButtonWrapper
									responsive
									startIcon={<OpenInNewIcon />}
									variant="contained"
									color="primary"
									type="submit"
								// onClick={a18.handleSubmit}
								>
									執行
								</ButtonWrapper>
							</FlexToolbar>
						</Grid>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

A18Form.propTypes = {
	onSubmit: PropTypes.func,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

A18Form.displayName = "A18Form";
export default A18Form;
