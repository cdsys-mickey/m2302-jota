import { Typography } from "@mui/material";
import CrudContext from "@/contexts/crud/CrudContext";
import { useContext } from "react";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const PackageTypeLabelContainer = (props) => {
	const {
		name,
		label = "包裝說明",
		typoVariant = "body1",
		children,
		emptyText = "(空白)",
		typoProps,
		...rest
	} = props;
	const { editing } = useContext(CrudContext);
	const value = useWatch({
		name,
	});

	const labelText = useMemo(() => {
		return value || children;
	}, [children, value]);

	return (
		<FormFieldLabel
			label={label}
			variant={typoVariant}
			emptyText={emptyText}
			sx={{
				...(editing && {
					position: "relative",
					top: -12,
				}),
			}}
			slotProps={{
				typography: {
					sx: {
						...(editing && {
							position: "relative",
							// top: -12,
						}),
					}
				}
			}}
			// typographySx={{
			// 	...(editing && {
			// 		position: "relative",
			// 		// top: -12,
			// 	}),
			// }}
			{...typoProps}>
			{labelText}
		</FormFieldLabel>
	);
};

PackageTypeLabelContainer.propTypes = {
	label: PropTypes.string,
};

PackageTypeLabelContainer.displayName = "PackageTypeLabelContainer";
