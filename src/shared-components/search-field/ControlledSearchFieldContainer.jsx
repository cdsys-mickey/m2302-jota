import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import { useContext } from "react";
import { ControlledSearchField } from "./ControlledSearchField";

export const ControlledSearchFieldContainer = (props) => {
	const { ...rest } = props;
	const responsive = useContext(ResponsiveContext);
	const { mobile } = responsive;
	return <ControlledSearchField mobile={mobile} {...rest} />;
};

ControlledSearchFieldContainer.displayName = "ControlledSearchFieldContainer";
