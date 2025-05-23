import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import ProdCatLPicker from "@/components/picker/ProdCatLPicker";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";

const H03Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="日期區間"
									leftComponent={<DatePickerWrapper
										name="SDate"
										fullWidth
										validate
										clearable
										autoFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
										name="EDate"
										fullWidth
										validate
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdCatLPicker
									name="catL"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdCatMPicker
									name="catM"
									disableOpenOnInput
									selectOnFocus
									catLName="catL"
								/>
							</Grid>
							<FlexGrid item xs={12} alignItems="flex-start">
								<CheckboxExWrapper
									label="包含撥出入"
									name="InclTX"
									defaultValue={true}
								/>

								<CheckboxExWrapper
									label="含試贈樣"
									name="InclTest"
									defaultValue={true}
								/>
							</FlexGrid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								{/* <FlexBox alignItems="center">
									<StdPrintOutputModePicker
										required
										name="outputType"
										label="執行方式"
									/>
								</FlexBox> */}
							</Grid>
							<Grid item xs={12} sm={6}>
								<FlexBox justifyContent="flex-end">
									<PrintReportButton
										color="primary"
										variant="contained"
										onSubmit={onSubmit}
										onDebugSubmit={onDebugSubmit}
									/>
								</FlexBox>
							</Grid>
						</Grid>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

H03Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H03Form.displayName = "H03Form";
export default H03Form;



