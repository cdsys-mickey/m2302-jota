import PropTypes from "prop-types";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React, { forwardRef, memo } from "react";
import HoverableListItem from "@/shared-components/HoverableListItem";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexGrid from "@/shared-components/FlexGrid";

const ItemRow = ({ children, sx = [], ...rest }) => {
	return (
		<Grid
			container
			columns={24}
			sx={[
				{
					minHeight: "36px",
					alignItems: "center",
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{children}
		</Grid>
	);
};

ItemRow.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.array,
};

const IndexCell = ({ children, sx = [] }) => {
	return (
		<Grid
			item
			xs={1}
			sx={[
				{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					"& *": {
						color: "rgb(0 0 0 / 50%)",
					},
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}>
			<Box pr={1}>{children}</Box>
		</Grid>
	);
};

IndexCell.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.array,
};

const ProdCodeCell = (props) => {
	const { children } = props;
	return (
		<Grid item pr={1} xs={6} sm={4} md={4} lg={3}>
			{children}
		</Grid>
	);
};

ProdCodeCell.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.array,
};

const ProdNameCell = (props) => {
	const { children } = props;
	return (
		<Grid item pr={1} xs={12} sm={12} md={4} lg={9}>
			{children}
		</Grid>
	);
};

ProdNameCell.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.array,
};

const PriceCell = (props) => {
	const { children } = props;
	return (
		<FlexGrid
			item
			pr={1}
			xs={6}
			sm={4}
			md={4}
			lg={3}
			justifyContent="center"
			sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
			{children}
		</FlexGrid>
	);
};

const StockCell = (props) => {
	const { children } = props;
	return (
		<FlexGrid
			item
			pr={1}
			xs={6}
			sm={4}
			md={4}
			lg={3}
			justifyContent="center"
			sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
			{children}
		</FlexGrid>
	);
};

const MockA01ListItem = memo(
	forwardRef(({ index, data, onEdit, ...rest }, ref) => {
		return (
			<HoverableListItem ref={ref} borderBottom {...rest}>
				<HoverableListItemSecondaryAction>
					<Tooltip arrow title="編輯">
						<IconButton onClick={onEdit}>
							<EditOutlinedIcon htmlColor="#000" />
						</IconButton>
					</Tooltip>
				</HoverableListItemSecondaryAction>
				<ItemRow>
					<IndexCell>
						<Typography variant="body1"></Typography>
					</IndexCell>
					<ProdCodeCell>{data?.Code}</ProdCodeCell>
					<ProdNameCell>{data?.Name}</ProdNameCell>
					<PriceCell>{data?.Price}</PriceCell>
					<StockCell>{data?.Stock}</StockCell>
				</ItemRow>
			</HoverableListItem>
		);
	})
);

export default MockA01ListItem;

export const MockA01ListHeader = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListViewHeader ref={ref} {...rest}>
				<Grid container columns={24}>
					<IndexCell></IndexCell>
					<ProdCodeCell>商品代碼</ProdCodeCell>
					<ProdNameCell>品名及規格</ProdNameCell>
					<PriceCell>建議售價</PriceCell>
					<StockCell>庫存</StockCell>
				</Grid>
			</ListViewHeader>
		);
	})
);
