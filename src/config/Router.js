import {createDrawerNavigator} from 'react-navigation-drawer'
import HomePage from "../db/Home";
import InsertPage from "../db/Insert";
import ViewPage from "../db/View";
import UpdatePage from "../db/Update";
import DeletePage from "../db/Delete";

export const Drawer = createDrawerNavigator(
    {
        Home: HomePage,
        Tambah: InsertPage,
        Lihat: ViewPage,
        Ubah: UpdatePage,
        Hapus: DeletePage,
    }
);