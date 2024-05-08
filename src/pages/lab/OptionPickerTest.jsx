import {
	Autocomplete,
	Box,
	Grid,
	ListSubheader,
	TextField,
	Typography,
} from "@mui/material";
import { ProdPickerContainer } from "../../components/picker/ProdPickerContainer";
import { DeptUserPicker } from "../../components/picker/DeptUserPicker";
import FormSectionBox from "../../shared-components/form/FormSectionBox";
import FormSectionTitle from "../../shared-components/form/FormSectionTitle";
import OptionPicker from "../../shared-components/picker/OptionPicker";
import RWListboxComponent from "../../shared-components/picker/listbox/RWListboxComponent";
import RWPopper from "../../shared-components/picker/listbox/RWPopper";
import ListboxComponent from "../../shared-components/picker/listbox/ListboxComponent";
import { OptionPickerProvider } from "../../shared-components/picker/listbox/OptionPickerProvider";

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

const OptionPickerTest = () => {
	return (
		<Box p={3}>
			<FormSectionTitle>10,000 options</FormSectionTitle>
			<FormSectionBox p={1}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Autocomplete
							id="virtualize-demo"
							sx={{ width: 300 }}
							disableListWrap
							PopperComponent={RWPopper}
							ListboxComponent={ListboxComponent}
							options={OPTIONS}
							groupBy={(option) => option[0].toUpperCase()}
							renderInput={(params) => (
								<TextField
									{...params}
									label="native Autocomplete"
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
					<Grid item xs={12} md={6}>
						<OptionPicker
							label="OptionPicker powered"
							id="virtualize-demo"
							sx={{ width: 300 }}
							disableListWrap
							// PopperComponent={RWPopper}
							ListboxComponent={RWListboxComponent}
							options={OPTIONS}
							groupBy={(option) => option[0].toUpperCase()}
							// renderInput={(params) => (
							// 	<TextField {...params} label="10,000 options" />
							// )}
							renderOption={(
								props,
								option,
								state
								// ownerState
							) => [
								props,
								option,
								state.index,
								// ownerState.getOptionLabel,
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
						<ProdPickerContainer label="WebApiOptionPicker" />
					</Grid>
					<Grid item xs={6}>
						{/* 產品 */}
						<OptionPickerProvider
						// renderRow={renderRow}
						>
							<ProdPickerContainer
								virtualize
								groupBy={(option) => option.ProdID[0]}
								label="WebApiOptionPicker with virtualize ON"

								// renderGroup={(params) => params}
							/>
						</OptionPickerProvider>
					</Grid>
				</Grid>
			</FormSectionBox>
		</Box>
	);
};

OptionPickerTest.propTypes = {};

OptionPickerTest.displayName = "OptionPickerTest";
export default OptionPickerTest;
