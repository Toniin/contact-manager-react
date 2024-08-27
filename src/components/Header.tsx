// import ButtonSignOut from "@/components/buttons/ButtonSignOut.tsx";
// import {useAppSelector} from "@/redux/hooks.ts";

function Header() {
    // const user = useAppSelector(state => state.persistedReducer)

    const title: string = "Contact manager"

    return (
        <header className="container flex justify-between items-center py-10">
            <h1 className="text-5xl">{ title }</h1>
            <h2>Sous-titre</h2>
            {/*{user.isSignIn ?*/}
            {/*    <ButtonSignOut/>*/}
            {/*    : null}*/}
        </header>
    );
}

export default Header;