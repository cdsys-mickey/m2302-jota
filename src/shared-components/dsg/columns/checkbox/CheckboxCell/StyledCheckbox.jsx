import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const CheckboxContainer = styled('span')({
	position: 'relative',
	display: 'inline-block',
	lineHeight: 0, // 避免額外的行高影響對齊
});

const HiddenInput = styled('input', {
	shouldForwardProp: (prop) => prop !== 'size' && prop !== 'disabled',
})(({ size }) => ({
	position: 'absolute',
	opacity: 0, // 隱藏原生 input
	width: size === 'large' ? 24 : 18,
	height: size === 'large' ? 24 : 18,
	cursor: 'pointer',
	zIndex: 1, // 確保 input 可點擊
	'&:disabled': {
		cursor: 'not-allowed',
	},
}));

const CheckboxIcon = styled('span')(({ size, disabled }) => ({
	display: 'inline-block',
	width: size === 'large' ? 24 : 18,
	height: size === 'large' ? 24 : 18,
	color: disabled ? '#424242' : '#757575', // 邊框顏色（未選中或禁用）
	'& svg': {
		width: '100%',
		height: '100%',
		fill: 'currentColor', // 繼承父元素的 color
	},
	'&.checked': {
		color: '#B0B0B0', // 選中時的背景/邊框顏色
		'& svg': {
			fill: '#FFFFFF', // 勾選標記為白色
		},
	},
	'&:hover:not(.disabled)': {
		color: '#B0B0B0',
		boxShadow: '0 0 8px rgba(255, 255, 255, 0.2)', // 懸停陰影
	},
	'&.disabled': {
		opacity: 0.5,
	},
	'&:focus-within': {
		boxShadow: '0 0 0 3px rgba(176, 176, 176, 0.3)', // 焦點光暈
	},
}));

const StyledCheckbox = forwardRef(({ size = 'medium', disabled, checked, onMouseDown, onChange, onKeyDown }, ref) => {
	return (
		<CheckboxContainer className="dsg-checkbox">
			<HiddenInput
				type="checkbox"
				size={size}
				tabIndex={-1}
				ref={ref}
				disabled={disabled}
				checked={checked}
				onMouseDown={onMouseDown}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<CheckboxIcon
				size={size}
				disabled={disabled}
				className={`${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
			>
				{checked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
			</CheckboxIcon>
		</CheckboxContainer>
	);
});

StyledCheckbox.propTypes = {
	size: PropTypes.string,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
	onMouseDown: PropTypes.func,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
};

StyledCheckbox.displayName = 'StyledCheckbox';

export default StyledCheckbox;