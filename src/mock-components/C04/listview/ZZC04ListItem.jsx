import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
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

const ProdCodeCell = (props) => {
	const { children } = props;
	return (
		<Grid item pr={1} xs={8} sm={6} md={4} lg={3}>
			{children}
		</Grid>
	);
};

const ProdNameCell = (props) => {
	const { children } = props;
	return (
		<Grid item pr={1} xs={8} sm={6} md={4} lg={9}>
			{children}
		</Grid>
	);
};

const KeeperCell = (props) => {
	const { children } = props;
	return (
		<FlexGrid
			item
			pr={1}
			xs={6}
			sm={4}
			md={4}
			lg={3}
			// justifyContent="center"
			sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
			{children}
		</FlexGrid>
	);
};

const ProviderCell = (props) => {
	const { children } = props;
	return (
		<FlexGrid
			item
			pr={1}
			xs={6}
			sm={4}
			md={4}
			lg={3}
			// justifyContent="center"
			sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
			{children}
		</FlexGrid>
	);
};

const OrderCell = (props) => {
	const { children } = props;
	return (
		<FlexGrid
			item
			pr={1}
			xs={6}
			sm={4}
			md={4}
			lg={3}
			// justifyContent="center"
			// sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
		>
			{children}
		</FlexGrid>
	);
};

const C04ListItem = React.forwardRef(
	({ index, data, onEdit, ...rest }, ref) => {
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
					<ProdCodeCell>{data.id}</ProdCodeCell>
					<ProdNameCell>{data.date}</ProdNameCell>
					<KeeperCell>{data.keeper?.name || "未設定"}</KeeperCell>
					<ProviderCell>
						{data.supplier?.name || "未設定"}
					</ProviderCell>
					<OrderCell>{data.Sheet}</OrderCell>
				</ItemRow>
			</HoverableListItem>
		);
	}
);

export default React.memo(C04ListItem);

export const C04ListHeader = React.memo(
	React.forwardRef(({ ...rest }, ref) => {
		return (
			<ListViewHeader ref={ref} {...rest}>
				<Grid container columns={24}>
					<IndexCell></IndexCell>
					<ProdCodeCell>進貨單號</ProdCodeCell>
					<ProdNameCell>進貨日期</ProdNameCell>
					<KeeperCell>倉管人員</KeeperCell>
					<ProviderCell>廠商</ProviderCell>
					<OrderCell>採購單號</OrderCell>
				</Grid>
			</ListViewHeader>
		);
	})
);
