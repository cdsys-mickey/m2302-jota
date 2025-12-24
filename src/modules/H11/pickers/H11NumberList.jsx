import { useState } from 'react';
import { List, ListItem, TextField, Button, Box, Grid } from '@mui/material';
import { useCallback } from 'react';
import { TextFieldWrapper } from '@/shared-components/TextFieldEx/TextFieldWrapper';
import FlexBoxView from '@/shared-components/ZZFlexBox/FlexBoxView';
import { useWatch } from 'react-hook-form';
import { Fragment } from 'react';

const H11NumberList = (props) => {
	const { name = "values", rankName, control } = props || {};
	// 初始化等級和數字陣列
	const [entries, setEntries] = useState([
		{ rank: 'A', value: 100000 },
		{ rank: 'B', value: 50000 },
		{ rank: 'C', value: 20000 },
		{ rank: 'D', value: 0 },
		{ rank: 'E', value: null },
		{ rank: 'F', value: null },
	]);

	// 更新等級的處理函式
	const handleRankChange = useCallback((index, value) => {
		const updatedEntries = [...entries];
		updatedEntries[index].rank = value;
		setEntries(updatedEntries);
	}, [entries]);

	// 更新數字的處理函式
	const handleValueChange = useCallback((index, value) => {
		const updatedEntries = [...entries];
		updatedEntries[index].value = Number(value) || 0; // 確保值為數字
		setEntries(updatedEntries);
	}, [entries]);

	// 排序數字（由大到小）
	// const sortEntries = () => {
	// 	setEntries([...entries].sort((a, b) => b.value - a.value));
	// };
	const value = useWatch({
		name,
		control
	})

	return (
		<Box p={1}>
			<Grid container spacing={1}>
				{value.map((entry, index) => (
					<>
						<Grid item xs={4}>
							<TextFieldWrapper
								name={`${rankName}[${index}]`}
								onChange={(e) => handleRankChange(index, e.target.value)}
								fullWidth
								size="small"
								variant="standard"
								InputProps={{
									inputProps: { style: { textAlign: 'right' } }, // 文字靠右對齊
								}}
							/>
						</Grid>
						<Grid item xs={8}>
							<TextFieldWrapper
								name={`${name}[${index}]`}
								type="number"
								onChange={(e) => handleValueChange(index, e.target.value)}
								fullWidth
								size="small"
								variant="standard"
								InputProps={{
									inputProps: { style: { textAlign: 'right' } }, // 文字靠右對齊
								}}
							/>
						</Grid>
					</>
				))}
			</Grid>
			{/* <Button
				variant="contained"
				color="primary"
				onClick={sortEntries}
				style={{ marginTop: '16px' }}
			>
				排序由大到小
			</Button> */}
		</Box>
	);
};

export default H11NumberList;
