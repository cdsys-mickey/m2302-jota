import FlexBoxView from "./FlexBox/FlexBoxView";
import clsx from "clsx";
import { forwardRef } from "react";

const HoverableListItemSecondaryAction = forwardRef(
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
						zIndex: 10000,
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
HoverableListItemSecondaryAction.displayName =
	"HoverableListItemSecondaryAction";
export default HoverableListItemSecondaryAction;
