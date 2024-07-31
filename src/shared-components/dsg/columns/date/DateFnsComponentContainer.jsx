import { useContext } from "react";
import DateFnsComponent from "./DateFnsComponent";
import { DsgContext } from "@/shared-contexts/datasheet-grid/DsgContext";

export const DateFnsComponentContainer = (props) => {
	const { ...rest } = props;
	const dsg = useContext(DsgContext);
	return (
		<DateFnsComponent
			skipDisabled={dsg.skipDisabled}
			nextCell={dsg.nextCell}
			{...rest}
		/>
	);
};

DateFnsComponentContainer.displayName = "DateFnsComponentContainer";
