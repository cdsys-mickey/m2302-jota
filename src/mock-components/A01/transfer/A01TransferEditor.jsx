import { MockShops } from "@/mocks/mock-shops";
import Shops from "@/modules/md-shops";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import { TypoWebApiOptionPicker } from "@/shared-components/typo/TypoWebApiOptionPicker";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Container, Grid, IconButton } from "@mui/material";
import { nanoid } from "nanoid";
import React, { Fragment, forwardRef, memo, useCallback } from "react";
import { ButtonWrapper } from "../../../shared-components/button/ButtonWrapper";
import MuiStyles from "../../../shared-modules/sd-mui-styles";

const A01TransferEditor = memo(
	forwardRef((props, ref) => {
		const { name, value = [], onChange, ...rest } = props;
		const handleAdd = useCallback(
			(e) => {
				e?.stopPropagation();
				let newValue = [
					...value,
					{
						key: nanoid(),
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
			<Container maxWidth="xs" disableGutters sx={{ mx: 0 }}>
				{/* 新增 */}
				{/* <Stack spacing={1}> */}
				<Box mb={1}>
					<Grid container spacing={1}>
						{value.map((t, i) => (
							<Fragment key={t.key}>
								<Grid item xs={7}>
									<TypoWebApiOptionPicker
										label="門市"
										options={MockShops}
										name={`${name}[${i}].shop`}
										getOptionLabel={Shops.getOptionLabel}
										isOptionEqualToValue={
											Shops.isOptionEqualToValue
										}
									/>
								</Grid>
								<Grid item xs={3}>
									<ControlledTextField
										label="調撥成本"
										name={`${name}[${i}].cost`}
										size="small"
										InputLabelProps={
											MuiStyles.DEFAULT_INPUT_LABEL_PROPS
										}
										type="number"
									/>
								</Grid>
								<Grid item xs={2}>
									<IconButton onClick={() => handleDelete(i)}>
										<ClearIcon />
									</IconButton>
								</Grid>
							</Fragment>
						))}
					</Grid>
				</Box>
				{/* <FlexBox inline>
				<TypoWebApiOptionPicker name="shop" options={MockShops} />
				<ControlledTextField label="調撥成本" name="cost" />
				<IconButton>
					<ClearIcon />
				</IconButton>
			</FlexBox> */}
				<ButtonWrapper
					variant="contained"
					color="inherit"
					onClick={handleAdd}>
					新增
				</ButtonWrapper>
				{/* </Stack> */}
				{/* 既有 */}
			</Container>
		);
	})
);

A01TransferEditor.displayName = "A01TransferEditor";

export default A01TransferEditor;
