import { Grid, Typography } from '@mui/material';
import PropTypes from "prop-types";
import { useMemo } from 'react';
import FieldGroup from './FieldGroup';
import FlexBox from './FlexBox';

export default function RangeGroup({ legend, leftComponent, rightComponent, required = false, seperator = "~" }) {

	const _legend = useMemo(() => {
		return required ? `${legend || "(無標頭)"}*` : legend;
	}, [legend, required])

	return (
		<FieldGroup legend={_legend} required={required}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={5.75}>
					{leftComponent}
				</Grid>
				<Grid item xs={12} sm={0.5} sx={{ display: { xs: 'none', sm: 'block' } }}>
					<FlexBox justifyContent="center">
						<Typography variant="body1">{seperator}</Typography>
					</FlexBox>
				</Grid>
				<Grid item xs={12} sm={5.75}>
					{rightComponent}
				</Grid>
			</Grid>
		</FieldGroup>
	);
}

RangeGroup.propTypes = {
	required: PropTypes.bool,
	legend: PropTypes.string,
	seperator: PropTypes.string,
	leftComponent: PropTypes.element,
	rightComponent: PropTypes.element,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}