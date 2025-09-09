import { Tab } from "@mui/material";
import { useContext, useMemo } from "react";
import P38 from "../../P38.mjs";
import P38Context from "../../P38Context";

const P38AliasTab = (props) => {
	const { ...rest } = props;

	const p38 = useContext(P38Context);

	const _disabled = useMemo(() => {
		return p38.editing && p38.selectedTab != P38.TABS.ALIAS;
	}, [p38.editing, p38.selectedTab])

	return (
		<Tab
			label="團種類名稱設定"
			value={P38.TABS.ALIAS}
			disabled={_disabled}
			{...rest}
		/>
	);
}

export default P38AliasTab;