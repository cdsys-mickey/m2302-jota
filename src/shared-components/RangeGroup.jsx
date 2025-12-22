import { Grid, Typography } from '@mui/material';
import PropTypes from "prop-types";
import { useMemo } from 'react';
import FieldGroup from './FieldGroup';
import FlexBoxView from './FlexBox/FlexBoxView';
import { ResponsiveGrid } from './responsive-grid/ResponsiveGrid';

export default function RangeGroup({ legend, leftComponent, rightComponent, required = false, multiline = false, disabled = false, seperator = "~" }) {

	const _legend = useMemo(() => {
		return required ? `${legend || "(無標頭)"}*` : legend;
	}, [legend, required])

	return (
		<FieldGroup legend={_legend} required={required} disabled={disabled}>
			<ResponsiveGrid container spacing={1}>
				<ResponsiveGrid item xs={multiline ? 7.5 : 5.75}>
					{leftComponent}
				</ResponsiveGrid>
				{multiline && <FlexBox fullWidth />}
				{multiline && <ResponsiveGrid item xs={4}></ResponsiveGrid>}
				<ResponsiveGrid item xs={0.5}>
					<FlexBox justifyContent="center">
						<Typography variant="body1">{seperator}</Typography>
					</FlexBox>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={multiline ? 7.5 : 5.75}>
					{rightComponent}
				</ResponsiveGrid>
			</ResponsiveGrid>
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