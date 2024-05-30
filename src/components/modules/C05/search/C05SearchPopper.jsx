// import CabinetTypes from "@/modules/md-cabinet-types";

import { SupplierPickerContainer } from "@/components/picker/SupplierPickerContainer";
import TaxType2Picker from "@/components/picker/TaxType2Picker";
import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import { DatePickerWrapper } from "../../../../shared-components/date-picker/DatePickerWrapper";
import { EmployeePicker } from "../../../picker/EmployeePicker";

const C05SearchPopper = memo(
	forwardRef((props, ref) => {
		const {
			width = "40ch",
			onClose,
			onReset,
			ContentProps,
			// ...rest
		} = props;
		return (
			// Box 的 ref 不能放到 Paper 上
			<PopperBox width={width} ref={ref}>
				<PopperTitle onClose={onClose}>進階篩選</PopperTitle>
				<DialogContent {...ContentProps}>
					<Divider sx={{ mt: 0, mb: 2 }} />
					<Grid container spacing={1.5} columns={12}>
						<Grid item xs={12} sm={12}>
							<OptionPickerProvider>
								<SupplierPickerContainer
									label="廠商代碼"
									name="supplier"
									variant="outlined"
									optionLabelSize="small"
									virtualize
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="spn"
								label="廠商名稱"
								variant="outlined"
								size="small"
								fullWidth
								clearable
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="spa"
								label="廠商地址"
								variant="outlined"
								size="small"
								fullWidth
								clearable
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="spu"
								label="統一編號"
								variant="outlined"
								size="small"
								fullWidth
								clearable
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="inv"
								label="發票號碼"
								variant="outlined"
								size="small"
								fullWidth
								clearable
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TaxType2Picker name="taxType" label="稅外加" />
						</Grid>
						<Grid item xs={12} sm={12}>
							<DatePickerWrapper name="rd" label="退貨日期" />
						</Grid>
						<Grid item xs={12} sm={12}>
							<EmployeePicker name="employee" label="倉管人員" />
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />
				<DialogActions>
					{/* <ButtonWrapper
						size="small"
						variant="contained"
						color="inherit"
						onClick={onClear}>
						清除
					</ButtonWrapper> */}
					<ButtonWrapper
						size="small"
						variant="contained"
						color="warning"
						onClick={onReset}>
						清除
					</ButtonWrapper>
					<ButtonWrapper
						startIcon={<FilterAltIcon />}
						type="submit"
						variant="contained"
						// onClick={handleSubmit}
					>
						篩選
					</ButtonWrapper>
				</DialogActions>
			</PopperBox>
		);
	})
);
C05SearchPopper.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onClose: PropTypes.func,
	onReset: PropTypes.func,
	ContentProps: PropTypes.object,
};
C05SearchPopper.displayName = "C05SearchPopper";

export default C05SearchPopper;
