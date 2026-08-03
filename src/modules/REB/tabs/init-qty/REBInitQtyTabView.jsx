import AuthDeptPicker from "@/components/AuthDeptPicker";
import Auth from "@/modules/Auth.mjs";
import REB from "@/modules/REB/REB.mjs";
import { DatePickerEx, FormFieldLabel } from "@/shared-components";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import { TabPanel } from "@mui/lab";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import REBInitQtyRebuildButtonContainer from "./REBInitQtyRebuildButtonContainer";
import ProdPicker from "@/components/picker/ProdPicker";

const REBInitQtyTabView = (props) => {
	const { ...rest } = props;
	return (
		<TabPanel value={REB.TabType.INIT_QTY} {...rest}>
			<Grid container columns={12} spacing={1}>
				<Grid item xs={12}>
					<AuthDeptPicker
						label="門市編號"
						required
						name="dept"
						disableOpenOnInput
						// disabled={deptDisabled}
						// onChange={onDeptChange}
						disableByClass={Auth.SCOPES.ROOT}
					/>
				</Grid>
				<Grid item xs={6}>
					<ProdPicker
						name="prod"
						size="small"
						virtualize
						disableOpenOnInput
						selectOnFocus
						// borderless
						placeholder="商品編號"

					/>
				</Grid>
			</Grid>

			<FlexBox mt={1.8}>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6}></Grid>
					<Grid item xs={12} sm={6}>
						<FlexBox justifyContent="flex-end">
							<REBInitQtyRebuildButtonContainer />
						</FlexBox>
					</Grid>
				</Grid>
			</FlexBox>
		</TabPanel>
	);
}

REBInitQtyTabView.propTypes = {
	onSessionChanged: PropTypes.func,
	onDeptChange: PropTypes.func,
	minDate: PropTypes.object,
	deptDisabled: PropTypes.bool
}

REBInitQtyTabView.displayName = "REBInitQtyTabView";
export default REBInitQtyTabView;
