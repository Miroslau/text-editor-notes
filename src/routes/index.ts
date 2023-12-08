import RouteType from "../types/route-type";
import { CREATE_NOTE, EDIT_NOTE, NOTES } from "../constants/routes";
import NotesPage from "../pages/notes-page";
import CreateNote from "../pages/notes-page/create-note";
import EditNote from "../pages/notes-page/edit-note";

const routes: RouteType[] = [
  {
    path: NOTES,
    Component: NotesPage,
  },
  {
    path: CREATE_NOTE,
    Component: CreateNote,
  },
  {
    path: EDIT_NOTE,
    Component: EditNote,
  },
];

export default routes;
