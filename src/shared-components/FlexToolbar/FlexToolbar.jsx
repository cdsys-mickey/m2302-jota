import { Box, Toolbar } from '@mui/material';
import PropTypes from "prop-types";

const FlexToolbar = (props) => {
	const {
		leftComponents = [],
		rightComponents = [],
		minHeight = "40px"
	} = props;
	return (
		<Toolbar
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				paddingX: 2,
				paddingY: 1,
				borderBottom: '1px solid #e0e0e0',
				// backgroundColor: "rgba(0,0,0,0.03)",
				"&.MuiToolbar-root": {
					minHeight
				},
			}}
		>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				{leftComponents}
				{/* {leftComponents.map((component, index) => (
					<Box key={`left-${index}`}>{component}</Box>
				))} */}
			</Box>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				{rightComponents}
				{/* {rightComponents.map((component, index) => (
					<Box key={`right-${index}`}>{component}</Box>
				))} */}
			</Box>
		</Toolbar>
	);
};

FlexToolbar.propTypes = {
	minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	leftComponents: PropTypes.array,
	rightComponents: PropTypes.array,
}

export default FlexToolbar;
