import { useContext } from "react";
import P42DrvPayCheckboxView from "./P42DrvPayCheckboxView";
import { P42Context } from "@/modules/P42/P42Context";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";

const P42DrvPayCheckboxContainer = ({ name }) => {
	const p42 = useContext(P42Context);
	const value = useWatch({
		name
	})
	const tooltip = useMemo(() => {
		return value ? "司機佣金已發" : "司機佣金未發";
	}, [value])

	return (
		<P42DrvPayCheckboxView
			name={name}
			editing={p42.editing}
			tooltip={tooltip} />
	)
}
P42DrvPayCheckboxContainer.propTypes = {
	name: PropTypes.string.isRequired
}
P42DrvPayCheckboxContainer.displayName = "P42DrvPayCheckboxContainer";
export default P42DrvPayCheckboxContainer;