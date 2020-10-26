import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import {NavLink} from "react-router-dom"

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

export default function Menu({open, setOpen}) {
    const classes = useStyles();

    const toggleDrawer = (open) => () => {
        setOpen(open)
    };
    const menu = [
        {id: 1, title: 'Пользователи', to: '/users'},
        {id: 2, title: 'Купоны', to: '/coupons'},
        {id: 3, title: 'Заказы', to: '/orders'}
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
                            <ListItemText primary={item.title} />
                        </ListItem>
                    </NavLink>
                    )
                })}
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