import {useEffect} from "react";
import {useAppSelector} from "@/redux/hooks";
import {useNavigate} from "react-router-dom";
import {Outlet} from "react-router-dom";

export default function PublicRoutes() {
    const user = useAppSelector(state => state.persistedReducer)
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isSignIn === true) {
            navigate("/contacts", {replace: true});
        }
    }, [user, navigate]);

    return <Outlet/>;
}