import { useMemo } from "react";
import B02ListToolbar from "./B02ListToolbar";
import { useFormContext } from "react-hook-form";
import { BContext } from "@/contexts/B/BContext";
import { useContext } from "react";
import { B04Context } from "@/contexts/B04/B04Context";
import { B02Context } from "@/contexts/B02/B02Context";


const B02ListToolbarContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);
	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			b02.onDebugSubmit,
		)
	}, [b02.onDebugSubmit, form]);

	return <B02ListToolbar onDebugSubmit={onDebugSubmit}  {...rest} />
}

B02ListToolbarContainer.displayName = "B02ListToolbarContainer";
export default B02ListToolbarContainer;