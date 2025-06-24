import { useContext } from "react";
import { G06Context } from "@/modules/G06/G06Context";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ButtonEx } from "@/shared-components";

const G06EditButton = (props) => {
	const { ...rest } = props;
	const g06 = useContext(G06Context);

	if (g06.itemData?.CutNotes || !g06.canUpdate) {
		return false;
	}

	return (
		<ButtonEx
			startIcon={<EditOutlinedIcon />}
			color="primary"
			onClick={g06.promptUpdating}
			{...rest}>
			輸入收款資料
		</ButtonEx>
	);
}

G06EditButton.propTypes = {

}

G06EditButton.displayName = "G06EditButton";
export default G06EditButton;