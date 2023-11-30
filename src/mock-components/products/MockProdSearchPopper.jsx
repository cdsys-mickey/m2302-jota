import { MockProdClassLg } from "@/mocks/mock-prod-class-lg";
// import CabinetTypes from "@/modules/md-cabinet-types";
import ProdClasses from "@/modules/md-prod-classes";
import ButtonEx from "@/shared-components/button/ButtonEx";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import PopperBox from "@/shared-components/popper/PopperBox";
import PopperTitle from "@/shared-components/popper/PopperTitle";
import TypoWebApiOptionsPicker from "@/shared-components/typo/TypoWebApiOptionsPicker";
import SearchIcon from "@mui/icons-material/Search";
import { DialogActions, DialogContent, Divider, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import MuiStyles from "../../shared-modules/sd-mui-styles";

const MockProdSearchPopper = memo(
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
								label="貨品編號"
								variant="outlined"
								size="small"
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="BarCode"
								label="條碼"
								variant="outlined"
								size="small"
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="SimpleCode"
								label="簡碼"
								variant="outlined"
								size="small"
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							<ControlledTextField
								name="ProdName"
								label="品名或規格"
								variant="outlined"
								size="small"
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							{/* <TypoWebApiOptionsPicker
								label="櫃別"
								name="Cabinet"
								options={Object.entries(CabinetTypes.Types).map(
									([id, name]) => ({
										id,
										name,
									})
								)}
								getOptionLabel={CabinetTypes.getOptionLabel}
								isOptionEqualToValue={
									CabinetTypes.isOptionEqualToValue
								}
								fullWidth
							/> */}
						</Grid>
					</Grid>
					<Divider textAlign="center" sx={{ mt: 2, mb: 0.5 }}>
						分類
					</Divider>
					<Grid container spacing={2} columns={12}>
						<Grid item xs={12} sm={12}>
							<TypoWebApiOptionsPicker
								label="大"
								name="PrdClassL"
								options={MockProdClassLg}
								getOptionLabel={ProdClasses.getOptionLabel}
								isOptionEqualToValue={
									ProdClasses.isOptionEqualToValue
								}
							/>
						</Grid>
						{/* <Grid item xs={12} sm={12}>
						<TypoWebApiOptionsPicker
							label="中"
							name="PRDCLASS_M"
							options={MockProdClassMd}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TypoWebApiOptionsPicker
							label="小"
							name="PRDCLASS_S"
							options={MockProdClassSm}
						/>
					</Grid> */}
					</Grid>

					{/* 
				<Box mt={2}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FlexBox
								fullWidth
								inline
								justifyContent="flex-end"
								sx={[
									(theme) => ({
										"& button + button": {
											marginLeft: theme.spacing(1),
										},
									}),
								]}>
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
							</FlexBox>
						</Grid>
					</Grid>
				</Box> */}
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

MockProdSearchPopper.displayName = "MockProdSearchPopper";

export default MockProdSearchPopper;
