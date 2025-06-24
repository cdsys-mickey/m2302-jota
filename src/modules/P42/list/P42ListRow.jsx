import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import P42IDColumn from "./columns/P42IDColumn";
import P42NameColumn from "./columns/P42NameColumn";
import { useMemo } from "react";
import P42BankColumn from "./columns/P42BankColumn";

const P42ListRow = memo((props) => {
	const { index, style, value, onClick } = props;
	const { BankID, BankData_N } = value || {};

	const bank = useMemo(() => {
		return [BankID, BankData_N].filter(Boolean).join(" ");
	}, [BankData_N, BankID])

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				{/* <HoverableListItemSecondaryAction>
					<Tooltip arrow title="編輯">
						<IconButton>
							<EditOutlinedIcon htmlColor="#000" />
						</IconButton>
					</Tooltip>
				</HoverableListItemSecondaryAction> */}
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
					<P42IDColumn>{value?.FactID}</P42IDColumn>
					<P42NameColumn>
						{value?.FactData}
					</P42NameColumn>
					<P42BankColumn>
						{bank}
					</P42BankColumn>
					{/* <P42ClassNColumn loading={loading}>
						{value?.Clas_N}
					</P42ClassNColumn> */}
				</Grid>
			</HoverableListItem>
		</div>
	);
});

P42ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

P42ListRow.displayName = "P42ListRow";
export default P42ListRow;



