import { useContext } from "react";
import B05QuoteGrid from "./B05QuoteGrid";
import { B05Context } from "@/contexts/B05/B05Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";

export const B05QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b05 = useContext(B05Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<B05QuoteGrid
			gridRef={b05.setGridRef}
			readOnly={!b05.editing}
			data={b05.gridData}
			handleGridChange={b05.handleQuoteGridChange}
			bearer={auth.token}
			height={height - 330}
			getRowKey={b05.getRowKey}
			{...rest}
		/>
	);
};

B05QuoteGridContainer.displayName = "B05QuoteGridContainer";
