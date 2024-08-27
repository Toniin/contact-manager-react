// import {useNavigate} from "react-router-dom";
// import {Button} from "@/components/ui/button.tsx";

function ErrorRoute() {
    // const navigate = useNavigate();

    return (
        <div className="h-full flex flex-col items-center justify-center gap-10">
            <h2 className="text-9xl">404</h2>
            <h3 className="text-4xl">Page not found</h3>

            {/*<Button onClick={() => navigate("/")}>*/}
            {/*    Return*/}
            {/*</Button>*/}
        </div>
    )
}

export default ErrorRoute;