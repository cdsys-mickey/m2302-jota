import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C04DateColumn from "./columns/C04DateColumn";
import C04IdColumn from "./columns/C04IdColumn";
import C04DeptColumn from "./columns/C04DeptColumn";
import C04UserColumn from "./columns/C04UserColumn";
import C04FlagColumn from "./columns/C04FlagColumn";
import C04DeptIdColumn from "./columns/C04DeptIdColumn";
import C04DeptNameColumn from "./columns/C04DeptNameColumn";
import C04NumColumn from "./columns/C04NumColumn";

const C04ListRow = memo((props) => {
	const { index, style, value, onClick, expChecking } = props;

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<HoverableListItemSecondaryAction>
				</HoverableListItemSecondaryAction>
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
						<C04IdColumn>
							{value?.進貨單號}
						</C04IdColumn>
						<C04DateColumn>
							{value?.進貨日期}
						</C04DateColumn>
						<C04UserColumn>
							{value?.倉管人員}
						</C04UserColumn>
						<C04DeptIdColumn>
							{value?.廠商代碼}
						</C04DeptIdColumn>
						<C04DeptNameColumn expChecking={expChecking}>
							{value?.廠商名稱}
						</C04DeptNameColumn>
						{expChecking && (
							<>
								<C04IdColumn>
									{value?.商品編號}
								</C04IdColumn>
								<C04NumColumn>
									{value?.數量}
								</C04NumColumn>
								<C04DateColumn>
									{value?.有效期限}
								</C04DateColumn>
							</>
						)}
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

C04ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	expChecking: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

C04ListRow.displayName = "C04ListRow";
export default C04ListRow;
