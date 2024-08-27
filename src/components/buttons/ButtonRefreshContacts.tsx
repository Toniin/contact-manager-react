import {getContacts} from "@/redux/actions/contact.action";
import {useAppDispatch} from "@/redux/hooks";
import {LuRotateCw} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {isNotSearching} from "@/redux/reducers/isSearchingReducer";

function ButtonRefreshContacts() {
    const dispatch = useAppDispatch()

    function refreshContacts() {
        dispatch(getContacts())
        dispatch(isNotSearching())
    }

    return (
        <Button className="w-fit" onClick={() => refreshContacts()}>
            <LuRotateCw className="mr-2 h-5 w-5" />Reset
        </Button>
    );
}

export default ButtonRefreshContacts;