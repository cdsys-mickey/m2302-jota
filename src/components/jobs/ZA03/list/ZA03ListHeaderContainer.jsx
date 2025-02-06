import { useMemo } from "react";
import ZA03ListHeader from "./ZA03ListHeader";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

const ZA03ListHeaderContainer = (props) => {
	const { ...rest } = props;
	const auth = useContext(AuthContext);

	const showAuthScope = useMemo(() => {
		return auth.operator?.hasRoot;
	}, [auth.operator?.hasRoot])

	return <ZA03ListHeader showAuthScope={showAuthScope} {...rest} />
}

ZA03ListHeaderContainer.displayName = "ZA03ListHeaderContainer";
export default ZA03ListHeaderContainer;