import { Tab } from "@mui/material";
import { useContext, useMemo } from "react";
import P38Context from "../../P38Context";
import P38 from "../../P38.mjs";

const P38TitleTab = (props) => {
	const { ...rest } = props;

	const p38 = useContext(P38Context);

	const _disabled = useMemo(() => {
		return p38.editing && p38.selectedTab != P38.TABS.TITLE;
	}, [p38.editing, p38.selectedTab])

	return (
		<Tab
			label="簽收單抬頭設定"
			value={P38.TABS.TITLE}
			// value="TITLE"
			disabled={_disabled}
			{...rest}
		/>
	);
}

export default P38TitleTab;