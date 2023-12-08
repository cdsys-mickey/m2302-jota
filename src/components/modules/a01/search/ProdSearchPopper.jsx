import { MockProdClassLg } from "@/mocks/mock-prod-class-lg";
// import CabinetTypes from "@/modules/md-cabinet-types";
import ProdClasses from "@/modules/md-prod-classes";
import ButtonEx from "@/shared-components/button/ButtonEx";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import SearchIcon from "@mui/icons-material/Search";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import WebApiOptionPicker from "../../../../shared-components/picker/WebApiOptionPicker";
import DialogEx from "@/shared-components/dialog/DialogEx";
import ClearInputButton from "../../../../shared-components/input/ClearInputButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const ProdSearchPopper = memo(
	forwardRef((props, ref) => {
		const {
			width = "40ch",
			onClose,
			// onReset,
			ContentProps,
			...rest
		} = props;
		return (
			// Box 的 ref 不能放到 Paper 上
			<PopperBox width={width} ref={ref}>
				<PopperTitle onClose={onClose}>進階篩選</PopperTitle>
				<DialogContent {...ContentProps}>
					<Divider sx={{ mt: 0, mb: 2 }} />
					<Grid container spacing={2} columns={12}>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								autoFocus
								name="pi"
								label="貨品編號"
								variant="outlined"
								size="small"
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
								EndAdornmentComponent={ClearInputButton}
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
								EndAdornmentComponent={ClearInputButton}
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
								EndAdornmentComponent={ClearInputButton}
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
						startIcon={<FilterAltIcon />}
						type="submit"
						variant="contained"
						size="small"
						// onClick={handleSubmit}
					>
						篩選
					</ButtonEx>
				</DialogActions>
			</PopperBox>
		);
	})
);

ProdSearchPopper.displayName = "ProdSearchPopper";

export default ProdSearchPopper;
