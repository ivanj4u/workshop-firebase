import {createDrawerNavigator} from 'react-navigation-drawer'
import {InsertData} from "../db/Insert";
import ViewData from "../db/View";

export const Drawer = createDrawerNavigator(
    {
        Insert: InsertData,
        View: ViewData,
    }
);