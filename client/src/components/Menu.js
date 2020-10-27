import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import {NavLink} from "react-router-dom"
import PersonIcon from '@material-ui/icons/Person'
import PeopleIcon from '@material-ui/icons/People'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    listItem: {
        alignItems: 'center'
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    }
});

export default function Menu({open, setOpen, userName, handleClickLogout}) {
    const classes = useStyles();

    const toggleDrawer = (open) => () => {
        setOpen(open)
    };
    const menu = [
        {id: 1, title: 'Пользователи', to: '/users', icon: <PeopleIcon />},
        {id: 2, title: 'Купоны', to: '/coupons', icon: <ConfirmationNumberIcon />},
        // {id: 3, title: 'Заказы', to: '/orders', icon: <ShoppingBasketIcon />}
    ]

    const list = (menuList) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <NavLink to='/' className={classes.link}>
                    <ListItem button className={classes.listItem}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Главная' />
                    </ListItem>
                </NavLink>
                {menuList.map(item => {
                    return (
                      <NavLink key={item.id} to={item.to} className={classes.link}>
                        <ListItem button className={classes.listItem}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    </NavLink>
                    )
                })}
                <ListItem divider={true} />
                <ListItem>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>
                        {userName}
                    </ListItemText>
                </ListItem>
                <ListItem button className={classes.listItem} onClick={handleClickLogout}>
                    <ListItemText secondary='Выйти' />
                </ListItem>
            </List>
        </div>
    )

    return (
        <SwipeableDrawer
            anchor='left'
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            {list(menu)}
        </SwipeableDrawer>
    );
}