import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";
import { FlexBox } from "shared-components";

const P41FlagColumn = (props) => {
	const { children, ...rest } = props;

	return (
		<ListColumn item pr={1} xs={2} sm={1.5} md={1.25} {...rest}>
			<FlexBox justifyContent="flex-start">
				{children}
			</FlexBox>
		</ListColumn>
	);
};

P41FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P41FlagColumn.displayName = "P41FlagColumn";
export default P41FlagColumn;



