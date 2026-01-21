import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import AreaPicker from "@/components/jobs/A06/form/fields/AreaPicker";
import ChannelPicker from "@/components/jobs/A06/form/fields/ChannelPicker";
import SalesTypePicker from "@/components/sales-type-picker/SalesTypePicker";
import ValuePicker from "@/components/value-picker/ValuePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import Fieldset from "@/shared-components/Fieldset";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import DateFormats from "@/shared-modules/DateFormats.mjs";
import H11NumberList from "./pickers/H11NumberList";
import H11ReportTypePicker from "./pickers/H11ReportTypePicker";

const H11Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={8}>
								<Grid container columns={12} spacing={1}>
									<Grid item xs={12} sm={6}>
										<DatePickerWrapper
											autoFocus
											name="Year"
											label="年度"
											validate
											clearable
											views={["year"]}
											format={DateFormats.DATEFNS_YEAR}
											required
											rules={{
												required: "年度為必填"
											}}
										/>

									</Grid>

									<Grid item xs={4}>
										<ValuePicker
											label="季度"
											name="Season"
											options={[1, 2, 3, 4]}
											disableClearable
											required
											rules={{
												required: "季度為必填"
											}}
										/>
									</Grid>
									<FlexBox fullWidth />

									{/* 區域 */}
									<Grid item xs={12} sm={12}>
										<RangeGroup legend="客戶區域"
											leftComponent={<AreaPicker
												name="SAreaID"
												label="客戶區域"
												fullWidth
												validate
												clearable
												borderless
												placeholder="起"
											/>}
											rightComponent={<AreaPicker
												name="EAreaID"
												label="截止區域"
												fullWidth
												validate
												clearable
												borderless
												placeholder="迄"
											/>}
										/>
									</Grid>
									{/* 通路 */}
									<Grid item xs={12} sm={12}>
										<RangeGroup legend="客戶通路"
											leftComponent={<ChannelPicker
												name="SLineID"
												fullWidth
												validate
												clearable
												borderless
												placeholder="起"
											/>}
											rightComponent={<ChannelPicker
												name="ELineID"
												fullWidth
												validate
												clearable
												borderless
												placeholder="迄"
											/>}
										/>
									</Grid>
									<Grid item xs={12} sm={12}>
										<SalesTypePicker
											name="SalType"
											label="零售"
											fullWidth
											validate
											clearable
										/>
									</Grid>
									<Grid item xs={12} sm={12}>
										<TextFieldWrapper
											name="TopNo"
											label="每一區域/通路,僅列前幾名店家"
											type="number"
											size="small"
											fullWidth
										/>
									</Grid>
									<FlexBox fullWidth />
									<Grid item xs={12} sm={12}>
										<H11ReportTypePicker
											name="reportType"
											disableOpenOnInput
											selectOnFocus
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Fieldset label="≧ 下限">
									<H11NumberList name="numbers" rankName="ranks" />
								</Fieldset>
							</Grid>
						</Grid>
						<FlexBox mt={1}>
							<Grid container spacing={1}>
								<FlexGrid item xs={12} sm={6} alignItems="center">
									{/* <StdPrintOutputModePicker
										required
										name="outputType"
										label="執行方式"
									/> */}
								</FlexGrid>
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
						</FlexBox>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

H11Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H11Form.displayName = "H11Form";
export default H11Form;






