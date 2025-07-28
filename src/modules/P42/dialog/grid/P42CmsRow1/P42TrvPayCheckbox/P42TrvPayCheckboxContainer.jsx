import { useWatch } from "react-hook-form";
import P42TrvPayCheckboxView from "./P42TrvPayCheckboxView";
import { P42Context } from "@/modules/P42/P42Context";
import { useContext } from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";

const P42TrvPayCheckboxContainer = ({ name }) => {
	const p42 = useContext(P42Context);
	const value = useWatch({
		name
	})
	const tooltip = useMemo(() => {
		return value ? "旅行社佣金已發" : "旅行社佣金未發";
	}, [value])

	return (
		<P42TrvPayCheckboxView
			name={name}
			editing={p42.editing}
			tooltip={tooltip}
		/>
	)
}
P42TrvPayCheckboxContainer.propTypes = {
	name: PropTypes.string.isRequired
}
P42TrvPayCheckboxContainer.displayName = "P42TrvPayCheckboxContainer";
export default P42TrvPayCheckboxContainer;