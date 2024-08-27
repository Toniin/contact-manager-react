import {LuLogOut} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userSignOut} from "@/redux/reducers/userReducer"

function ButtonSignOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut = () => {
        localStorage.clear();
        dispatch(userSignOut())
        navigate("/sign-in", {replace: true})
    }

    return (
        <Button variant="outline" onClick={signOut}>
            <LuLogOut className="mr-2 h-4 w-4"/> Sign out
        </Button>
    );
}

export default ButtonSignOut;