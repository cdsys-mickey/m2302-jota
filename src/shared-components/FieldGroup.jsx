import Colors from '@/modules/Colors.mjs';
import { Box } from '@mui/system';
import PropTypes from "prop-types";
import { useMemo } from 'react';

export default function FieldGroup({ children, legend, required, disabled }) {

	const _required = useMemo(() => {
		return required && !disabled;
	}, [disabled, required])

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
				...(!disabled && {
					'&:hover': {
						borderColor: 'rgba(0, 0, 0, 0.87)',
					},
				}),
				'&:focus-within': {
					borderColor: theme.palette.primary.main,
					borderWidth: "2px",
					padding: '0 6px 3px 6px',
					'& legend': {
						color: theme.palette.primary.main,
						fontWeight: 600
					},
				},
				...(_required && {
					borderColor: Colors.REQUIRED,
				}),
				backgroundColor: "rgb(255,255,255)",
				...(disabled && {
					backgroundColor: Colors.INPUT_BG_DISABLED
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
						...(_required && {
							color: Colors.REQUIRED,
						})
					}}
					className="field-group-legend"
				>
					{legend}
				</Box>
			)}
			{/* 這裡微調輸入框灰底與 fieldset 的間隔 */}
			<Box sx={{ display: 'flex', gap: '8px', marginTop: '-1px', marginBottom: '1px' }} className="field-group-body">
				{children}
			</Box>
		</Box>
	);
}

FieldGroup.propTypes = {
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	legend: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}