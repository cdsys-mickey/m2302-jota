import { G06Context } from "@/modules/G06/G06Context";
import { ButtonEx } from "@/shared-components";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useContext } from "react";

const G06DeleteButton = (props) => {
	const { ...rest } = props;
	const g06 = useContext(G06Context);

	if (g06.itemData?.CutNotes || !g06.canDelete) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			startIcon={<HighlightOffIcon />}
			color="secondary"
			onClick={g06.confirmDelete}
			{...rest}>
			刪除
		</ButtonEx>
	);
}

G06DeleteButton.propTypes = {

}

G06DeleteButton.displayName = "G06DeleteButton";
export default G06DeleteButton;