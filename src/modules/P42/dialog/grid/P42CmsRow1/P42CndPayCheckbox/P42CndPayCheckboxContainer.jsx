import { useContext } from "react";
import P42CndPayCheckboxView from "./P42CndPayCheckboxView";
import { P42Context } from "@/modules/P42/P42Context";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";

const P42CndPayCheckboxContainer = ({ name }) => {
	const p42 = useContext(P42Context);
	const value = useWatch({
		name
	})
	const tooltip = useMemo(() => {
		return value ? "導遊佣金已發" : "導遊佣金未發";
	}, [value])

	return (
		<P42CndPayCheckboxView
			name={name}
			editing={p42.editing}
			tooltip={tooltip} />
	)
}
P42CndPayCheckboxContainer.propTypes = {
	name: PropTypes.string.isRequired
}
P42CndPayCheckboxContainer.displayName = "P42CndPayCheckboxContainer";
export default P42CndPayCheckboxContainer;