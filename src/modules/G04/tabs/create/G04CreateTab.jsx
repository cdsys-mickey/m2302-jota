import { Grid } from "@mui/material";
import G04 from "../../G04.mjs";
import G04TabPanel from "../G04TabPanel";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import CustomerPicker from "@/components/picker/CustomerPicker";
import { Box } from "@mui/system";
import FlexToolbar from "@/shared-components/FlexToolbar/FlexToolbar";
import { FlexBox } from "@/shared-components";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import G04CreateBatchButtonContainer from "./G04CreateBatchButtonContainer";
import { TabPanel } from "@mui/lab";

const G04CreateTab = (props) => {
	const { ...rest } = props;
	return (
		<TabPanel value={G04.Tabs.CREATE} {...rest}>
			<Grid container columns={12} spacing={2}>
				<Grid item xs={12} sm={7}>
					<DatePickerWrapper
						name="AccYM"
						label="帳款年月"
						fullWidth
						validate
						// clearable
						autoFocus
						views={['year', 'month']}
						format="yyyy/MM"
						required
						placeholder="年/月"
					/>
				</Grid>
				<Grid item xs={12} sm={5}>
					<TextFieldWrapper
						name="Stage"
						label="期別"
						size="small"
						clearable
						type="number"
						fullWidth
						required
						rules={{
							required: "期別為必填"
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<DatePickerWrapper
						name="CutDate"
						label="截止日"
						clearable
						validate
						fullWidth
						required
					/>
				</Grid>
				<Grid item xs={12}>
					<TextFieldWrapper
						name="RecGroup"
						label="應收帳組別"
						size="small"
						clearable
						type="number"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<CustomerPicker
						name="CustID"
						size="small"
						virtualize
						disableOpenOnInput
						selectOnFocus
						fullWidth
					// placeholder="客戶編號"
					/>
				</Grid>

				<FlexBox fullWidth />
			</Grid>
			<Box mt={2}>
				<FlexToolbar
					borderBottom={false}
					rightComponents={
						<>
							<G04CreateBatchButtonContainer />
						</>}
				/>
			</Box>
		</TabPanel>
	);
}

G04CreateTab.displayName = "G04CreateTab";
export default G04CreateTab;