// import CabinetTypes from "@/modules/md-cabinet-types";
import CounterPicker from "@/components/picker/CounterPicker";
import ProdCatLPicker from "@/components/picker/ProdCatLPicker";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import ProdCatSPicker from "@/components/picker/ProdCatSPicker";
import { ButtonEx } from "@/shared-components";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import ClearInputButton from "@/shared-components/input/ClearInputButton";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import MuiStyles from "@/shared-modules/MuiStyles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import { forwardRef, memo } from "react";

const C04SearchPopper = memo(
	forwardRef((props, ref) => {
		const {
			width = "40ch",
			onClose,
			onReset,
			// onReset,
			ContentProps,
			...rest
		} = props;
		return (
			// Box 的 ref 不能放到 Paper 上
			<PopperBox width={width} ref={ref}>
				<PopperTitle onClose={onClose}>進階篩選</PopperTitle>
				<Divider sx={{ mt: 0, mb: 0 }} />
				<DialogContent {...ContentProps}>
					<Grid container spacing={2} columns={12}>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								autoFocus
								name="id"
								label="貨品編號"
								variant="outlined"
								size="small"
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
								// EndAdornmentComponent={ClearInputButton}
								clearable
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="bc"
								label="條碼"
								variant="outlined"
								size="small"
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
								// EndAdornmentComponent={ClearInputButton}
								clearable
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="pn"
								label="品名或規格"
								variant="outlined"
								size="small"
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
								// EndAdornmentComponent={ClearInputButton}
								clearable
							/>
						</Grid>
						<Grid item xs={12}>
							<ProdCatLPicker
								name="catL"
								disableOpenOnInput
								selectOnFocus
								slotProps={{
									paper: {
										sx: {
											width: 240,
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<ProdCatMPicker
								name="catM"
								disableOpenOnInput
								selectOnFocus
								slotProps={{
									paper: {
										sx: {
											width: 240,
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<ProdCatSPicker
								name="catS"
								disableOpenOnInput
								selectOnFocus
								slotProps={{
									paper: {
										sx: {
											width: 240,
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<CounterPicker
								label="櫃別"
								name="counter"
								disableOpenOnInput
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />
				<DialogActions>
					{/* <ButtonEx
						size="small"
						variant="contained"
						color="inherit"
						onClick={onReset}>
						清除
					</ButtonEx> */}
					<ButtonEx
						size="small"
						variant="outlined"
						color="warning"
						onClick={onReset}>
						清除
					</ButtonEx>
					<ButtonEx
						startIcon={<FilterAltIcon />}
						type="submit"
						variant="contained"
					// onClick={handleSubmit}
					>
						篩選
					</ButtonEx>
				</DialogActions>
			</PopperBox>
		);
	})
);

C04SearchPopper.displayName = "C04SearchPopper";

export default C04SearchPopper;
