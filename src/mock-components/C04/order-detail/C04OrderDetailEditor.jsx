import { MockProducts } from "@/mocks/mock-products";
import Products from "@/modules/md-prods";
import FlexGrid from "@/shared-components/FlexGrid";
import ButtonEx from "@/shared-components/button/ButtonEx";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import TypoWebApiOptionsPickerContainer from "@/shared-components/typo/TypoWebApiOptionsPickerContainer";
import MuiInputs from "@/shared-modules/mui-inputs";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Container, Grid, IconButton } from "@mui/material";
import React, { Fragment, forwardRef, memo, useCallback } from "react";
import { v4 as uuid } from "uuid";
import FlexBox from "@/shared-components/FlexBox";

const C04OrderDetailEditor = memo(
	forwardRef((props, ref) => {
		const {
			name,
			value = [],
			onChange,
			variant = "outlined",
			...rest
		} = props;

		const handleAdd = useCallback(
			(e) => {
				e?.stopPropagation();
				let newValue = [
					...value,
					{
						key: uuid(),
					},
				];
				onChange(newValue);
			},
			[onChange, value]
		);

		const handleDelete = useCallback(
			(i) => {
				value.splice(i, 1);
				onChange(value);
			},
			[onChange, value]
		);

		return (
			<Container maxWidth="md" disableGutters sx={{ mx: 0 }}>
				{/* 新增 */}
				{/* <Stack spacing={1}> */}
				<Box mb={1}>
					<Grid container spacing={1} columns={24}>
						{value.map((t, i) => (
							<Fragment key={t.key}>
								<Grid item xs={12} sm={12} md={9}>
									<TypoWebApiOptionsPickerContainer
										label="貨品"
										name={`${name}[${i}].product`}
										variant={variant}
										options={MockProducts}
										getOptionLabel={Products.getOptionLabel}
										isOptionEqualToValue={
											Products.isOptionEqualToValue
										}
									/>
								</Grid>
								<Grid item xs={3}>
									<ControlledTextField
										variant={variant}
										label="單價"
										name={`${name}[${i}].cost`}
										size="small"
										InputLabelProps={
											MuiInputs.DEFAULT_INPUT_LABEL_PROPS
										}
										type="number"
									/>
								</Grid>
								<Grid item xs={3}>
									<ControlledTextField
										variant={variant}
										label="數量"
										name={`${name}[${i}].quantity`}
										size="small"
										InputLabelProps={
											MuiInputs.DEFAULT_INPUT_LABEL_PROPS
										}
										type="number"
									/>
								</Grid>
								<Grid item xs={3}>
									<ControlledTextField
										variant={variant}
										label="金額"
										name={`${name}[${i}].total`}
										size="small"
										InputLabelProps={
											MuiInputs.DEFAULT_INPUT_LABEL_PROPS
										}
										type="number"
									/>
								</Grid>
								<FlexGrid item xs={12} sm={12} md={6}>
									<FlexBox flex={1}>
										<ControlledTextField
											fullWidth
											variant={variant}
											label="備註"
											name={`${name}[${i}].note`}
											size="small"
											InputLabelProps={
												MuiInputs.DEFAULT_INPUT_LABEL_PROPS
											}
											type="number"
										/>
									</FlexBox>
									<FlexBox>
										<IconButton
											onClick={() => handleDelete(i)}
											size="small">
											<ClearIcon />
										</IconButton>
									</FlexBox>
								</FlexGrid>
							</Fragment>
						))}
					</Grid>
				</Box>
				{/* <FlexBox inline>
				<TypoWebApiOptionsPicker name="shop" options={MockShops} />
				<ControlledTextField label="調撥成本" name="cost" />
				<IconButton>
					<ClearIcon />
				</IconButton>
			</FlexBox> */}
				<ButtonEx
					variant="contained"
					color="inherit"
					onClick={handleAdd}>
					新增
				</ButtonEx>
				{/* </Stack> */}
				{/* 既有 */}
			</Container>
		);
	})
);

C04OrderDetailEditor.displayName = "C04OrderDetailEditor";

export default C04OrderDetailEditor;
