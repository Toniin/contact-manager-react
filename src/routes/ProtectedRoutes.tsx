import {useEffect} from "react";
import {useAppSelector} from "@/redux/hooks";
import {Outlet, useNavigate} from "react-router-dom";

export default function ProtectedRoutes() {
    const user = useAppSelector(state => state.persistedReducer)
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isSignIn === false) {
            navigate("/sign-in", {replace: true});
        }
    }, [user, navigate]);

    return <Outlet/>;
}