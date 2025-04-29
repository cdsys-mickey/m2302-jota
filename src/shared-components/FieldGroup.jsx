import Colors from '@/modules/Colors.mjs';
import { Box } from '@mui/system';
import PropTypes from "prop-types";

export default function FieldGroup({ legend, required, children }) {
	return (
		<Box
			component="fieldset"
			className="field-group"
			sx={(theme) => ({
				border: '1px solid rgba(0, 0, 0, 0.23)',
				borderRadius: '4px',
				padding: '0 7px 4px 7px',
				margin: 0,
				marginTop: -1.0,
				'&:hover': {
					borderColor: 'rgba(0, 0, 0, 0.87)',
				},
				'&:focus-within': {
					borderColor: theme.palette.primary.main,
					borderWidth: "2px",
					padding: '0 6px 3px 6px',
					'& legend': {
						color: theme.palette.primary.main,
						fontWeight: 600
					},
				},
				...(required && {
					borderColor: Colors.REQUIRED,
				})
			})}
		>
			{legend && (
				<Box
					component="legend"
					sx={{
						fontSize: '0.75rem',
						lineHeight: "1.1em",
						padding: '0 4px',
						color: 'rgba(0, 0, 0, 0.6)',
						...(required && {
							color: Colors.REQUIRED,
						})
					}}
					className="field-group-legend"
				>
					{legend}
				</Box>
			)}
			{/* 這裡微調輸入框灰底與 fieldset 的間隔 */}
			<Box sx={{ display: 'flex', gap: '8px', marginTop: '-1px', marginBottom: '1px' }}>
				{children}
			</Box>
		</Box>
	);
}

FieldGroup.propTypes = {
	required: PropTypes.bool,
	legend: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}