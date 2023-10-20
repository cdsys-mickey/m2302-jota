import React from "react";
import FlexBox from "./FlexBox";
import clsx from "clsx";

const HoverableListItemSecondaryAction = React.forwardRef(
	({ className, sx = [], top = 0, right = 0, ...rest }, ref) => {
		return (
			<FlexBox
				ref={ref}
				// className="secondary-action"
				className={clsx(className, "secondary-action")}
				alignItems="center"
				sx={[
					(theme) => ({
						top: theme.spacing(top),
						right: theme.spacing(right),
						position: "absolute",
						"& .MuiIconButton-root": {
							marginLeft: theme.spacing(0.5),
							marginRight: theme.spacing(0.5),
						},
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}
			/>
		);
	}
);

export default React.memo(HoverableListItemSecondaryAction);
