import Types from '@/shared-modules/Types.mjs';
import { Box, Toolbar } from '@mui/material';
import PropTypes from "prop-types";

const FlexToolbar = (props) => {
	const {
		leftComponents = [],
		rightComponents = [],
		minHeight = "40px",
		borderTop = false,
		borderBottom = true,
		slotProps,
		gap = 1,
		sx
	} = props;

	const { sx: toolbarSx, ...toolbarProps } = slotProps?.toolbar ?? {};

	return (
		<Toolbar
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				...(typeof borderTop === 'string' ? { borderTop } : borderTop ? { borderTop: '1px solid #e0e0e0' } : {}),
				...(typeof borderBottom === 'string' ? { borderBottom } : borderBottom ? { borderBottom: '1px solid #e0e0e0' } : {}),
				"&.MuiToolbar-root": {
					// backgroundColor: "rgba(0,0,0,0.03)",
					paddingX: 0,
					minHeight,
					...sx,
					...toolbarSx
				},

			}}
			{...toolbarProps}
		>
			<Box sx={{ display: 'flex', gap, alignItems: 'center' }}>
				{leftComponents}
			</Box>
			<Box sx={{ display: 'flex', gap, alignItems: 'center' }}>
				{rightComponents}
			</Box>
		</Toolbar>
	);
};

FlexToolbar.propTypes = {
	minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	leftComponents: PropTypes.array,
	rightComponents: PropTypes.array,
	borderTop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	borderBottom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	slotProps: PropTypes.object,
	gap: PropTypes.number,
	sx: PropTypes.object
}

export default FlexToolbar;
