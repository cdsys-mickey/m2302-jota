import { useCallback } from "react";
import JobMenuItem from "./JobMenuItem";
import PropTypes from "prop-types";
import { useContext } from "react";
import { JobMenuContext } from "./JobMenuContext";

const JobMenuItemContainer = (props) => {
	const { item, ...rest } = props;
	const { handleDelete, handleHeaderEdit } = useContext(JobMenuContext);

	const _onDelete = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		handleDelete(item);
	}, [handleDelete, item]);

	const _onHeaderEdit = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		handleHeaderEdit(item);
	}, [handleHeaderEdit, item]);

	return <JobMenuItem item={item} onDelete={_onDelete} onHeaderEdit={_onHeaderEdit} {...rest} />
}
JobMenuItemContainer.propTypes = {
	item: PropTypes.object
}
JobMenuItemContainer.displayName = "JobMenuItemContainer";
export default JobMenuItemContainer;