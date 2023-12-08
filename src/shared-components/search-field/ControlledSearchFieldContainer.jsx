import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import { useContext } from "react";
import { ControlledSearchField } from "./ControlledSearchField";

export const ControlledSearchFieldContainer = (props) => {
	const { ...rest } = props;
	const responsive = useContext(ResponsiveContext);
	return <ControlledSearchField mobile={responsive.mobule} {...rest} />;
};

ControlledSearchFieldContainer.displayName = "ControlledSearchFieldContainer";
