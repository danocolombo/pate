import './registration.styles.scss';
import { Stack, Typography, Button } from '@mui/material';
const RegistrationCompleteModal = ({ handleConfirm }) => {
    return (
        <div>
            <div className='success-message__wrapper'>
                <Typography variant='h5' className='modal__success__banner'>
                    SUCCESS
                </Typography>
                <Stack sx={{ margin: 5 }}>
                    <Typography
                        variant='h5'
                        align='center'
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingBottom: 10,
                        }}
                    >
                        Your registration has been completed.
                    </Typography>
                </Stack>
                <Stack direction='row' justifyContent='center'>
                    <Button
                        variant='contained'
                        onClick={handleConfirm}
                        sx={{ backgroundColor: 'green', margin: 2 }}
                    >
                        OK
                    </Button>
                </Stack>
            </div>
        </div>
    );
};

export default RegistrationCompleteModal;
