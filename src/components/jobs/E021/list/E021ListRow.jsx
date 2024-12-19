import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import E021CustomerColumn from "./columns/E021CustomerColumn";
import E021DateColumn from "./columns/E021DateColumn";
import E021FlagColumn from "./columns/E021FlagColumn";
import E021IdColumn from "./columns/E021IdColumn";
import E021UserColumn from "./columns/E021UserColumn";

const E021ListRow = memo((props) => {
	const { index, style, value, onClick } = props;

	const customer = useMemo(() => {
		const { 客戶代碼, 客戶簡稱 } = value || "";
		return [客戶代碼, 客戶簡稱].filter(Boolean).join(" ");
	}, [value])


	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<Box>
					<Grid
						container
						columns={24}
						sx={[
							{
								minHeight: "36px",
								alignItems: "center",
							},
						]}>
						<IndexColumn title={index}></IndexColumn>
						<E021IdColumn>
							{value?.銷貨單號 || ""}
						</E021IdColumn>
						<E021DateColumn >
							{value?.銷貨日期 || ""}
						</E021DateColumn>

						<E021FlagColumn>
							{value?.零售 || ""}
						</E021FlagColumn>
						<E021CustomerColumn>
							{customer}
						</E021CustomerColumn>
						<E021UserColumn>
							{value?.業務人員 || ""}
						</E021UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

E021ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

E021ListRow.displayName = "E021ListRow";
export default E021ListRow;



