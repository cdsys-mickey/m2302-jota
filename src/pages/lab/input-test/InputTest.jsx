import { DeptUserPicker } from "@/components/picker/DeptUserPicker";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import RWPopper from "@/shared-components/option-picker/listbox/RWPopper";
import VirtualizedPickerListbox from "@/shared-components/option-picker/listbox/VirtualizedPickerListbox";
import PropTypes from "prop-types";

import {
	Autocomplete,
	Box,
	Grid,
	ListSubheader,
	TextField,
	Typography,
} from "@mui/material";
import ProdTypeAPicker from "../../../components/picker/ProdTypeAPicker";
import { TextFieldWrapper } from "../../../shared-components/text-field/TextFieldWrapper";
import { useRef } from "react";
import ProdTypeA from "../../../modules/md-prod-type-a";
import LockSwitch from "../../../shared-components/LockSwitch";
import ProdTypeBPicker from "../../../components/picker/ProdTypeBPicker";
import ProdPicker from "../../../components/picker/ProdPicker";
import CheckboxExWrapper from "../../../shared-components/checkbox/CheckboxExWrapper";
import { DateFieldWrapper } from "../../../shared-components/date-field/DateFieldWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";

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
							<LockSwitch />
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
						<Grid item xs={4}>
							<ProdPicker
								debug={true}
								name="picker2"
								label="商品"
								labelShrink
								placeholder="輸入商品編號"
								filterByServer
								rules={{
									required: "此項必填",
								}}
								// queryRequired
								virtualize
								// 新增屬性
								disableOpenOnInput
								// pressToFind
								notFoundText="商品代號 ${id} 不存在"
							/>

						</Grid>
						<Grid item xs={4}>
							<ProdTypeAPicker
								name="picker1"
								label="picker1"
								// 新增屬性
								disableOpenOnInput
							/>
						</Grid>

						<Grid item xs={4}>
							<ProdTypeBPicker
								name="picker3"
								label="picker3"
								disableOpenOnInput
							/>
						</Grid>
						<Grid item xs={4}>
							<CheckboxExWrapper name="check1" label="check1" />
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
