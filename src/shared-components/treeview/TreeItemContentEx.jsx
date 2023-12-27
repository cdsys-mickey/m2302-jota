import * as React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import useTreeItem from "@mui/lab/TreeItem/useTreeItem";

/** 為了客製化, 自 5.8.3 的 src 複製出來改造的
 * @see - https://github.com/mui/material-ui/blob/master/packages/mui-lab/src/TreeItem/TreeItemContent.js
 */
const TreeItemContentEx = React.forwardRef((props, ref) => {
	const {
		classes,
		className,
		displayIcon,
		expansionIcon,
		icon: iconProp,
		label,
		nodeId,
		onClick,
		onMouseDown,
		// Ex PROPS
		toggleExpandedOnLabelClick = false,
		expandOnLabelClick = false,
		selectOnIconClick = true,
		container = false,
		// Ex METHODS
		onLabelClick,
		...other
	} = props;
	const {
		disabled,
		expanded,
		selected,
		focused,
		handleExpansion,
		handleSelection,
		preventSelection,
	} = useTreeItem(nodeId);

	const icon = iconProp || expansionIcon || displayIcon;

	const handleMouseDown = (event) => {
		console.log(`handleMouseDown`);
		preventSelection(event);

		if (onMouseDown) {
			onMouseDown(event);
		}
	};

	// const handleClick = (event) => {
	// 	console.log(`handleClick`);
	// 	handleExpansion(event);
	// 	handleSelection(event);

	// 	if (onClick) {
	// 		onClick(event);
	// 	}
	// };

	const handleIconClick = (event) => {
		console.log(`handleIconClick`);

		handleExpansion(event);
		// if (!dontSelectOnIconClick) {
		if (selectOnIconClick) {
			handleSelection(event);
		}

		if (onClick) {
			onClick(event);
		}
	};

	const handleLabelClick = (event) => {
		console.log(`handleLabelClick`);
		event.preventDefault();
		if (!container) {
			handleSelection(event);
		}

		if (toggleExpandedOnLabelClick || (expandOnLabelClick && !expanded)) {
			handleExpansion(event);
		}

		if (onLabelClick) {
			onLabelClick(event);
		}
	};

	return (
		/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- Key event is handled by the TreeView */
		<div
			className={clsx(className, classes.root, {
				[classes.expanded]: expanded,
				[classes.selected]: selected,
				[classes.focused]: focused,
				[classes.disabled]: disabled,
			})}
			// onMouseDown={handleMouseDown}
			// onClick={handleClick}
			ref={ref}
			{...other}>
			<div
				className={classes.iconContainer}
				onMouseDown={handleMouseDown}
				onClick={handleIconClick}>
				{icon}
			</div>
			<div
				className={classes.label}
				onMouseDown={handleMouseDown}
				onClick={handleLabelClick}>
				{label}
			</div>
		</div>
	);
});

TreeItemContentEx.propTypes = {
	// ----------------------------- Warning --------------------------------
	// | These PropTypes are generated from the TypeScript type definitions |
	// |     To update them edit the d.ts file and run "yarn proptypes"     |
	// ----------------------------------------------------------------------
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css) below for more details.
	 */
	classes: PropTypes.object,
	/**
	 * className applied to the root element.
	 */
	className: PropTypes.string,
	/**
	 * The icon to display next to the tree node's label. Either a parent or end icon.
	 */
	displayIcon: PropTypes.node,
	/**
	 * The icon to display next to the tree node's label. Either an expansion or collapse icon.
	 */
	expansionIcon: PropTypes.node,
	/**
	 * The icon to display next to the tree node's label.
	 */
	icon: PropTypes.node,
	/**
	 * The tree node label.
	 */
	label: PropTypes.node,
	/**
	 * The id of the node.
	 */
	nodeId: PropTypes.string.isRequired,
	/**
	 * @ignore
	 */
	onClick: PropTypes.func,
	/**
	 * @ignore
	 */
	onMouseDown: PropTypes.func,
};

export default TreeItemContentEx;
