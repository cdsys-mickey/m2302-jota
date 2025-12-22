import { forwardRef } from "react";
import { RWOuterElementContext } from "./RWOuterElementContext";
import { useContext } from "react";

const RWOuterElementType = forwardRef((props, ref) => {
	// 自 Provider 取出當初傳遞給 ListboxComponent 的 props
	// 傳遞給 div
	const outerProps = useContext(RWOuterElementContext);
	return <div ref={ref} {...props} {...outerProps} />;
});

RWOuterElementType.displayName = "RWOuterElementType";
export default RWOuterElementType;
