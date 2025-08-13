import { Grid, Typography } from '@mui/material';
import PropTypes from "prop-types";
import { useMemo } from 'react';
import FieldGroup from './FieldGroup';
import FlexBox from './FlexBox';

export default function RangeGroup({ legend, leftComponent, rightComponent, required = false, multiline = false, disabled = false, seperator = "~" }) {

	const _legend = useMemo(() => {
		return required ? `${legend || "(無標頭)"}*` : legend;
	}, [legend, required])

	return (
		<FieldGroup legend={_legend} required={required} disabled={disabled}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={multiline ? 7.5 : 5.75}>
					{leftComponent}
				</Grid>
				{multiline && <FlexBox fullWidth />}
				{multiline && <Grid item xs={4}></Grid>}
				<Grid item xs={1} sm={0.5}>
					<FlexBox justifyContent="center">
						<Typography variant="body1">{seperator}</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={11} sm={multiline ? 7.5 : 5.75}>
					{rightComponent}
				</Grid>
			</Grid>
		</FieldGroup>
	);
}

RangeGroup.propTypes = {
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	legend: PropTypes.string,
	seperator: PropTypes.string,
	leftComponent: PropTypes.element,
	rightComponent: PropTypes.element,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func]),
	multiline: PropTypes.bool
}