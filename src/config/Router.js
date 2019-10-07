import {createDrawerNavigator} from 'react-navigation-drawer'
import HomePage from "../db/Home";

export const Drawer = createDrawerNavigator(
    {
        Home: HomePage,
    }
);