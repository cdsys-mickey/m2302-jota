import { Box, Button, Container, Grid, IconButton, Stack } from "@mui/material";
import { MockShops } from "@/mocks/mock-shops";
import React, { Fragment, useCallback } from "react";
import FlexBox from "@/shared-components/FlexBox";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import TypoWebApiOptionsPicker from "@/shared-components/typo/TypoWebApiOptionsPicker";
import ClearIcon from "@mui/icons-material/Clear";
import ButtonEx from "@/shared-components/button/ButtonEx";
import Shops from "@/modules/md-shops";
import MuiInputs from "@/shared-modules/mui-inputs";
import { v4 as uuid } from "uuid";
import { forwardRef } from "react";
import { memo } from "react";

const A01TransferEditor = memo(
	forwardRef((props, ref) => {
		const { name, value = [], onChange, ...rest } = props;

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
			<Container maxWidth="xs" disableGutters sx={{ mx: 0 }}>
				{/* 新增 */}
				{/* <Stack spacing={1}> */}
				<Box mb={1}>
					<Grid container spacing={1}>
						{value.map((t, i) => (
							<Fragment key={t.key}>
								<Grid item xs={7}>
									<TypoWebApiOptionsPicker
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
											MuiInputs.DEFAULT_INPUT_LABEL_PROPS
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

A01TransferEditor.displayName = "A01TransferEditor";

export default A01TransferEditor;
