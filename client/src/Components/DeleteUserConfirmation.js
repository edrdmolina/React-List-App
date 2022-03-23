// Libraries
import React from 'react'
import axios from 'axios'
import { createUseStyles } from 'react-jss';

// Styles

const useStyles = createUseStyles({
    modalBackground: {
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0px',
        backgroundColor: '#07020D82'
    },
    modal: {
        height: '143px',
        width: '330px',
        position: 'fixed',
        top: '30%',
        left: 'calc(50% - 330px / 2)',
        border: '1px solid #FCFCFC',
        borderRadius: '10px',
        backgroundColor: '#F25C05',
        display: 'flex',
        flexDirection: 'column',

        '& p': {
            height: '50%'
        }
    },
    buttonGroup: {
        height: '50%',

        '& button': {
            width: '50%',
            borderTop: '1px solid #FCFCFC',
            height: '100%',
            color: '#FCFCFC',

            '&:hover': {
                backgroundColor: '#F28705',
            }
        },

        '& > :first-child': {
            borderRadius: '0 0 0 10px',
            borderRight: '1px solid #FCFCFC'
        },

        '& > :last-child': {
            borderRadius: '0 0 10px 0',
        }
        
    }

})

function DeleteUserConfirmation(props) {
    const classes = useStyles();
    const { password, user, cancelDeleteUser, updateMessage } = props;

    const deleteUser = async () => {
        const input = { password, user }
        const res = await axios.put('/api/users/delete', input);
        if (res.data.error) {
            updateMessage(res.data.error);
            return cancelDeleteUser();
        } else {
            return window.location.href = res.data.redirectUrl;
        }
    }
    
    const handleCancelDeleteUser = e => cancelDeleteUser()

    return (
        <div className={classes.modalBackground}>
            <div className={classes.modal}>
                <p>
                    This will delete all lists and items along with the user.
                    Are you sure you want to delete this account?
                </p>
                <div className={classes.buttonGroup}>
                    <button className='No' onClick={handleCancelDeleteUser} >No</button>
                    <button className='Yes' onClick={deleteUser}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteUserConfirmation;
