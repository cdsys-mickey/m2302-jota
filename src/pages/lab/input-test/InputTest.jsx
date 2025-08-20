import { DeptUserPicker } from "@/components/picker/DeptUserPicker";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import RWPopper from "@/shared-components/option-picker/listbox/RWPopper";
import VirtualizedPickerListbox from "@/shared-components/option-picker/listbox/VirtualizedPickerListbox";
import PropTypes from "prop-types";

import ProdPicker from "@/components/picker/ProdPicker";
import ProdTypeAPicker from "@/components/picker/ProdTypeAPicker";
import ProdTypeBPicker from "@/components/picker/ProdTypeBPicker";
import { DateFieldWrapper } from "@/shared-components/date-field/DateFieldWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FieldGroup from "@/shared-components/FieldGroup";
import FlexBox from "@/shared-components/FlexBox";
import LockSwitch from "@/shared-components/LockSwitch";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import {
	Autocomplete,
	Box,
	Grid,
	ListSubheader,
	TextField,
	Typography,
} from "@mui/material";
import { CheckboxEx } from "@/shared-components";
import RangeGroup from "@/shared-components/RangeGroup";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
	// Props from React Window
	const { data, index, style } = props;

	// Props from Autocomplete-renderOption
	const dataSet = data[index];

	const componentProps = dataSet[0];
	const optionLabel = dataSet[1];

	const inlineStyle = {
		...style,
		top: style.top + LISTBOX_PADDING,
	};

	if (dataSet.group !== undefined) {
		return (
			<ListSubheader
				key={dataSet.key}
				component="div"
				style={inlineStyle}>
				{dataSet.group}
			</ListSubheader>
		);
	}

	return (
		<Typography
			component="li"
			{...componentProps}
			noWrap
			style={inlineStyle}>
			#{optionLabel}
		</Typography>
	);
}

function random(length) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";

	for (let i = 0; i < length; i += 1) {
		result += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}

	return result;
}

const OPTIONS = Array.from(new Array(10000))
	.map(() => random(10 + Math.ceil(Math.random() * 20)))
	.sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));

const InputTest = () => {
	return (
		<form>
			<Box px={3}>
				<FormSectionTitle>LockSwitch</FormSectionTitle>
				<FormSectionBox p={1} mb={1}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<LockSwitch width={80} />
						</Grid>
					</Grid>
				</FormSectionBox>

				<FormSectionTitle>OptionPicker</FormSectionTitle>
				<FormSectionBox p={1} mb={1}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6.5}>
							<FieldGroup legend="日期區間">
								<FlexBox flex={1}>
									<DatePickerWrapper
										autoFocus
										name="SDate"
										label=""
										fullWidth
										validate
										clearable
										borderless
									/>
								</FlexBox>
								<Box mx={0.2}>
									<Typography variant="body1">~</Typography>
								</Box>
								<FlexBox flex={1}>
									<DatePickerWrapper
										name="EDate"
										label=""
										fullWidth
										validate
										clearable
										borderless
									/>
								</FlexBox>

							</FieldGroup>
						</Grid>
					</Grid>
				</FormSectionBox>

				<FormSectionTitle>OptionPicker</FormSectionTitle>
				<FormSectionBox p={1} mb={1}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id="use autocomplete"
								sx={{ width: 300 }}
								disableListWrap
								PopperComponent={RWPopper}
								ListboxComponent={VirtualizedPickerListbox}
								options={OPTIONS}
								groupBy={(option) =>
									option[0].toUpperCase()
								}
								renderInput={(params) => (
									<TextField
										{...params}
										label="native Autocomplete"
										size="small"
									/>
								)}
								renderOption={(props, option, state) => [
									props,
									option,
									state.index,
								]}
								renderGroup={(params) => params}
							/>

						</Grid>
						<Grid item xs={6}>
							{/* 使用者 */}
							<DeptUserPicker width={300} />
						</Grid>
						<Grid item xs={6}>
							{/* 產品 */}
							<ProdPicker label="WebApiOptionPicker" />
						</Grid>
						<Grid item xs={6}>
							{/* 產品 */}
							<ProdPicker
								virtualize
								label="WebApiOptionPicker with virtualize ON"
							/>
						</Grid>
					</Grid>
				</FormSectionBox>
				<FormSectionTitle>Tab & Enter </FormSectionTitle>
				<FormSectionBox p={1} mb={1}>
					<Grid container spacing={1}>
						<Grid item xs={8}>
							<RangeGroup legend="貨品區間" required
								leftComponent={
									<ProdPicker
										debug={true}
										name="prodPicker"
										label=""
										required
										labelShrink
										placeholder="輸入商品編號"
										filterByServer
										rules={{
											required: "此項必填",
										}}
										// queryRequired
										virtualize
										fullWidth
										// 新增屬性
										disableOpenOnInput
										// pressToFind
										notFoundText="商品代號 ${input} 不存在"
										borderless
										clearOnEscape
									/>
								}
								rightComponent={
									<ProdPicker
										debug={true}
										name="prodPicker2"
										label=""
										labelShrink
										placeholder="輸入商品編號"
										filterByServer
										// rules={{
										// 	required: "此項必填",
										// }}
										// queryRequired
										virtualize
										// 新增屬性
										disableOpenOnInput
										// pressToFind
										notFoundText="商品代號 ${input} 不存在"
										borderless
									/>
								}
							/>


						</Grid>
						<Grid item xs={4}>
							<ProdTypeAPicker
								name="picker1"
								label="typeA"
								// 新增屬性
								disableOpenOnInput
							/>
						</Grid>

						<Grid item xs={4}>
							<ProdTypeBPicker
								name="picker3"
								label="typeB"
								disableOpenOnInput
							/>
						</Grid>
						<Grid item xs={4}>
							<CheckboxEx name="check1" label="check1" />
						</Grid>
						<Grid item xs={4}>
							<TextFieldWrapper
								name="text1"
								label="text1"
								size="small"
								clearable
								fullWidth
							/>
						</Grid>
						<Grid item xs={4}>
							<DateFieldWrapper name="date1" label="date1" />
						</Grid>
						<Grid item xs={4}>
							<DatePickerWrapper
								name="datepicker1"
								label="date-picker1"
								validate
							/>
						</Grid>
						<Grid item xs={4}>
							<TextFieldWrapper
								name="text2"
								label="text2"
								size="small"
								clearable
								// type="number"
								fullWidth
							// selectNext
							/>
						</Grid>
					</Grid>
				</FormSectionBox>
			</Box>
		</form>
	);
};

InputTest.propTypes = {
	findOption: PropTypes.func,
};

InputTest.displayName = "OptionPickerTest";
export default InputTest;
