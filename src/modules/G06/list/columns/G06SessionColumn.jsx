import { FlexBox } from "@/shared-components";
import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G06SessionColumn = (props) => {
	const { children, ...rest } = props;

	return (
		<ListColumn item pr={1} xs={6} sm={2} {...rest}>
			<FlexBox justifyContent="center">
				{children}
			</FlexBox>
		</ListColumn>
	);
};

G06SessionColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G06SessionColumn.displayName = "G06SessionColumn";
export default G06SessionColumn;

