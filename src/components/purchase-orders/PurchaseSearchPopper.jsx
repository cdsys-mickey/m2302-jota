import SearchIcon from "@mui/icons-material/Search";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import { MockProdClassLg } from "@/mocks/mock-prod-class-lg";
import CabinetTypes from "@/modules/md-cabinet-types";
import ProdClasses from "@/modules/md-prod-classes";
import React from "react";
import ButtonEx from "@/shared-components/button/ButtonEx";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import TypoWebApiOptionsPicker from "@/shared-components/typo/TypoWebApiOptionsPicker";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import MuiInputs from "@/shared-modules/mui-inputs";
import ControlledDateField from "@/shared-components/controlled/ControlledDateField";
import ControlledDatePicker from "@/shared-components/controlled/ControlledDatePicker";
import { memo } from "react";
import { forwardRef } from "react";

const PurchaseSearchPopper = memo(
	forwardRef((props, ref) => {
		const { width = "40ch", onClose, ContentProps, ...rest } = props;
		return (
			// Box 的 ref 不能放到 Paper 上
			<PopperBox width={width} ref={ref}>
				<PopperTitle onClose={onClose}>進階搜尋</PopperTitle>
				<DialogContent {...ContentProps}>
					<Divider sx={{ mt: 0, mb: 2 }} />
					<Grid container spacing={2} columns={12}>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="q"
								label="進貨單號"
								variant="filled"
								size="small"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							{/* <ControlledDateField */}
							<ControlledDatePicker
								name="BarCode"
								label="進貨日期"
								slotProps={{
									textField: {
										size: "small",
										variant: "filled",
										fullWidth: true,
									},
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="SimpleCode"
								label="倉管人員"
								variant="filled"
								size="small"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="ProdName"
								label="品名或規格"
								variant="filled"
								size="small"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<TypoWebApiOptionsPicker
								label="廠商"
								variant="filled"
								name="Cabinet"
								options={Object.entries(CabinetTypes.Types)}
								getOptionLabel={CabinetTypes.getOptionLabel}
								isOptionEqualToValue={
									CabinetTypes.isOptionEqualToValue
								}
								fullWidth
							/>
						</Grid>
					</Grid>
					<Divider textAlign="center" sx={{ mt: 2, mb: 0.5 }}>
						分類
					</Divider>
					<Grid container spacing={2} columns={12}>
						<Grid item xs={12} sm={12}>
							<TypoWebApiOptionsPicker
								label="大"
								variant="filled"
								name="PRDCLASS_L"
								size="small"
								options={MockProdClassLg}
								getOptionLabel={ProdClasses.getOptionLabel}
								isOptionEqualToValue={
									ProdClasses.isOptionEqualToValue
								}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />
				<DialogActions>
					<ButtonEx
						size="small"
						variant="contained"
						color="inherit"
						// onClick={handleReset}
					>
						重設
					</ButtonEx>
					<ButtonEx
						startIcon={<SearchIcon />}
						type="submit"
						variant="contained"
						size="small"
						// onClick={handleSubmit}
					>
						搜尋
					</ButtonEx>
				</DialogActions>
			</PopperBox>
		);
	})
);

PurchaseSearchPopper.displayName = "PurchaseSearchPopper";

export default PurchaseSearchPopper;
