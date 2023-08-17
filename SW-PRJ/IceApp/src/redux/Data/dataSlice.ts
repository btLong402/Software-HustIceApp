import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { DataSection } from '../../views/main_page/component/pages/DataModal';

const initialState : {Data : DataSection[]} = {
    Data: [],
}

export const DataSLice = createSlice({
    name:'dataSlice',
    initialState,
    reducers:{
        setData: (state, action: PayloadAction<DataSection[]>) => {
            state.Data=action.payload;
        },
    }
});

export const {
    setData
} = DataSLice.actions;
export default DataSLice.reducer;