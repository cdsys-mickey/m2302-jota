import { FlexBox } from "shared-components";
import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G02AmtColumn = (props) => {
	const { children, ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest}>
			<FlexBox justifyContent="flex-end">
				{children}
			</FlexBox>
		</ListColumn>
	);
};

G02AmtColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G02AmtColumn.displayName = "G02AmtColumn";
export default G02AmtColumn;

