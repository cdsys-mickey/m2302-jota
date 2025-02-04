import { useState } from 'react';
import { List, ListItem, TextField, Button, Box } from '@mui/material';
import { useCallback } from 'react';
import { TextFieldWrapper } from '@/shared-components/text-field/TextFieldWrapper';
import FlexBox from '@/shared-components/FlexBox';
import { useWatch } from 'react-hook-form';

const H11NumberList = (props) => {
	const { name = "values", control } = props || {};
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
	// const handleRankChange = useCallback((index, value) => {
	// 	const updatedEntries = [...entries];
	// 	updatedEntries[index].rank = value;
	// 	setEntries(updatedEntries);
	// }, [entries]);

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
		<div>
			<List >
				{value.map((entry, index) => (
					<ListItem key={index}>
						<FlexBox fullWidth>
							<TextFieldWrapper
								// label="數字"
								name={`${name}[${index}]`}
								type="number"
								// value={entry.value}
								onChange={(e) => handleValueChange(index, e.target.value)}
								fullWidth
								size="small"
								variant="standard"
								// slotProps={{
								// 	htmlInput: {
								// 		style: { textAlign: 'right' }
								// 	}
								// }}
								InputProps={{
									inputProps: { style: { textAlign: 'right' } }, // 文字靠右對齊
								}}
							/>
						</FlexBox>
					</ListItem>
				))}
			</List>
			{/* <Button
				variant="contained"
				color="primary"
				onClick={sortEntries}
				style={{ marginTop: '16px' }}
			>
				排序由大到小
			</Button> */}
		</div>
	);
};

export default H11NumberList;
