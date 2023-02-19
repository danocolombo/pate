import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    card: {
        boxShadow: '0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)',
        maxWidth: 400,
        margin: '0 auto',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    header: {
        padding: 5,
    },
    inputWrapper: {
        paddingTop: 5,
        padingBottom: 5,
    },
    input: {
        marginBottom: 5,
        marginTop: 5,
    },
    contact: {
        marginBottom: 5,
    },
    numberInputWrapper: {
        marginTop: 3,
        marginBottom: 3,
    },
});

export default useStyles;
