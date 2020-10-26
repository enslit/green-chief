import React from 'react'
import {Typography, Link} from "@material-ui/core"

export const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://enslit.ru/" target={'_blank'}>
                Enslit
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}