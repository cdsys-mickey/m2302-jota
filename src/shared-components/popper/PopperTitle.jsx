import { memo } from "react";
import DialogTitleEx from "@/shared-components/dialog/DialogTitleEx";
import PropTypes from "prop-types";

const PopperTitle = memo((props) => {
	const { children, onClose, ...rest } = props;

	return (
		<DialogTitleEx
			padding="8px 0 8px 16px"
			size="small"
			onClose={onClose}
			{...rest}>
			{children}
		</DialogTitleEx>
	);
});
PopperTitle.propTypes = {
	children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.array]),
	onClose: PropTypes.func,
};
PopperTitle.displayName = "PopperTitle";
export default PopperTitle;
