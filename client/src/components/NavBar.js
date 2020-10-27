import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "./Menu"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
    userArea: {
        marginLeft: 'auto'
    },
    logout: {
        marginLeft: theme.spacing(4)
    }
}));

const NavBar = ({ onLogout }) => {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState(false)
    // FIXME Сделать селектор title
    const title = useSelector(state => state.app.title)
    // FIXME Сделать селектор user
    const user = useSelector(state => state.auth.user)

    const handleClickMenu = () => {
        setOpenMenu(true)
    }

    const handleClickLogout = () => {
        onLogout()
    }

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleClickMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="subtitle1" component={'h4'} className={classes.title}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <Menu open={openMenu} setOpen={setOpenMenu} userName={user.name} handleClickLogout={handleClickLogout} />
        </>
    );
}

export default NavBar