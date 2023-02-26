import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function EventStatusSelect({ value, onChange }) {
    return (
        <>
            <InputLabel id='meeting-state-select-label'>
                Event Status
            </InputLabel>
            <Select
                labelId='meeting-state-select-label'
                id='meeting-state-select'
                style={{ padding: '0px', margin: '0px' }}
                value={value}
                onChange={onChange}
                sx={{
                    '& .Mui-selected.Mui-select-approved': {
                        color: 'green',
                        backgroundColor: 'green',
                    },
                    '& .Mui-selected.Mui-select-rejected': {
                        color: 'white',
                        backgroundColor: 'red',
                    },
                }}
            >
                <MenuItem value='draft'>Draft</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
                <MenuItem value='approved' className='Mui-select-approved'>
                    Approved
                </MenuItem>
                <MenuItem value='rejected' className='Mui-select-rejected'>
                    Rejected
                </MenuItem>
                <MenuItem value='cancelled'>Cancelled</MenuItem>
                <MenuItem value='complete'>Complete</MenuItem>
            </Select>
        </>
    );
}
