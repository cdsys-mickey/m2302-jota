import RecvAcctBatchCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctBatchCustomerPicker";
import { RecvAcctBatchSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctBatchSessionPicker";
import { TabPanel } from "@mui/lab";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import G07 from "@/modules/G07/G07.mjs";
import FlexBox from "@/shared-components/FlexBox";
import G07CarryForwardButtonContainer from "./G07CarryForwardButtonContainer";

const G07CarryTabView = (props) => {
	const { onSessionChanged, ...rest } = props;
	return (
		<TabPanel value={G07.Tabs.CARRY} {...rest}>
			<Grid container columns={12} spacing={2}>
				<Grid item xs={12} sm={12}>
					<RecvAcctBatchSessionPicker
						name="session"
						label="帳款年月+期別"
						fullWidth
						validate
						clearable
						autoFocus
						virtualize
						required
						rules={{
							required: "帳款年月+期別為必填",
						}}
						onChanged={onSessionChanged}
					// disableClose
					/>
				</Grid>
				<Grid item xs={12} sm={12}>
					<RecvAcctBatchCustomerPicker
						name="CustID"
						size="small"
						label="客戶編號"
						placeholder="客戶編號"
						virtualize
						disableOpenOnInput
						selectOnFocus
					// borderless
					// placeholder="起"
					/>
				</Grid>
			</Grid>
			<FlexBox mt={1.8}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<FlexBox justifyContent="flex-end">
							<G07CarryForwardButtonContainer />
						</FlexBox>
					</Grid>
				</Grid>
			</FlexBox>
		</TabPanel>
	);
}

G07CarryTabView.propTypes = {
	onSessionChanged: PropTypes.func
}

G07CarryTabView.displayName = "G07CarryTabView";
export default G07CarryTabView;