import { DeptUserPicker } from "@/components/picker/DeptUserPicker";
import { ProdPickerContainer } from "@/components/picker/ProdPickerContainer";
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

const OptionPickerTest = (props) => {
	const { findOption } = props;

	const inputRef1 = useRef();
	const inputRef2 = useRef();
	const inputRef3 = useRef();
	const inputRef4 = useRef();
	const inputRef5 = useRef();

	return (
		<form>
			<Box px={3}>
				<FormSectionTitle>OptionPicker</FormSectionTitle>
				<FormSectionBox p={1} mb={1}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<OptionPickerProvider>
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
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={6}>
							{/* 使用者 */}
							<DeptUserPicker width={300} />
						</Grid>
						<Grid item xs={6}>
							{/* 產品 */}
							<ProdPickerContainer label="WebApiOptionPicker" />
						</Grid>
						<Grid item xs={6}>
							{/* 產品 */}
							<OptionPickerProvider
							// renderRow={renderRow}
							>
								<ProdPickerContainer
									virtualize
									// groupBy={(option) => option.ProdID[0]}
									label="WebApiOptionPicker with virtualize ON"

									// renderGroup={(params) => params}
								/>
							</OptionPickerProvider>
						</Grid>
					</Grid>
				</FormSectionBox>
				<FormSectionTitle>Tab & Enter </FormSectionTitle>
				<FormSectionBox p={1} mb={1}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<ProdTypeAPicker
								name="disableOpenOnInput"
								label="disableOpenOnInput+findByInput"
								clearable
								inputRef={inputRef1}
								nextInputRef={inputRef2}
								disableOpenOnInput
								pressToFind
								findByInput={ProdTypeA.findById}
								// selectNext
							/>
						</Grid>
						<Grid item xs={4}>
							<ProdPickerContainer
								debug={true}
								name="disableOpenOnInput2"
								label="filterByServer+pressToFind"
								labelShrink
								placeholder="輸入商品編號"
								filterByServer
								rules={{
									required: "此項必填",
								}}
								queryRequired
								// 新增屬性
								disableOpenOnInput
								pressToFind
								inputRef={inputRef2}
								nextInputRef={inputRef3}
								prevInputRef={inputRef1}
								notFoundText="找不到商品 ${id}"
							/>
						</Grid>
						<Grid item xs={4}>
							<ProdTypeAPicker
								name="disableOpenOnInput3"
								label="disableOpenOnInput+findByInput(next)"
								clearable
								inputRef={inputRef3}
								nextInputRef={inputRef4}
								prevInputRef={inputRef2}
								disableOpenOnInput
								pressToFind
								findByInput={ProdTypeA.findById}

								// selectNext
							/>
						</Grid>
						<Grid item xs={4}>
							<TextFieldWrapper
								name="nextField"
								label="next field"
								inputRef={inputRef4}
								nextInputRef={inputRef5}
								prevInputRef={inputRef3}
								size="small"
								clearable
								// selectNext
							/>
						</Grid>
						<Grid item xs={4}>
							<TextFieldWrapper
								name="nextField2"
								label="next field"
								inputRef={inputRef5}
								nextInputRef={inputRef1}
								prevInputRef={inputRef4}
								size="small"
								clearable
								// selectNext
							/>
						</Grid>
					</Grid>
				</FormSectionBox>
			</Box>
		</form>
	);
};

OptionPickerTest.propTypes = {
	findOption: PropTypes.func,
};

OptionPickerTest.displayName = "OptionPickerTest";
export default OptionPickerTest;
