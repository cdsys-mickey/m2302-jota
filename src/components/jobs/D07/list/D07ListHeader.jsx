import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import D07IdColumn from "./columns/D07IdColumn";
import D07OrderNameColumn from "./columns/D07OrderNameColumn";
import D07UserColumn from "./columns/D07UserColumn";

const D07ListHeader = memo(
	forwardRef((props, ref) => {
		const { expChecking, ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<D07IdColumn>試算單號</D07IdColumn>
				<D07OrderNameColumn>名稱</D07OrderNameColumn>
				<D07UserColumn>編輯人員</D07UserColumn>
			</ListViewHeader>
		);
	})
);

D07ListHeader.propTypes = {
	expChecking: PropTypes.bool,
};

D07ListHeader.displayName = "D07ListHeader";
export default D07ListHeader;
