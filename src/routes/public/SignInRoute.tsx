import SignInForm from "@/components/forms/SignInForm";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

function SignInRoute() {
    const navigate = useNavigate();

    return (
        <div className="container flex flex-col items-center py-10">
            <div className="flex flex-col">
                <h2 className="pb-10 text-4xl">Sign in</h2>
                <SignInForm/>
            </div>
            <div className="flex items-center pt-8">
                <p>Don't have an account ?</p>
                <Button variant="link" className="text-blue-500" onClick={() => navigate("/sign-up")}>
                    Sign up
                </Button>
            </div>
        </div>
    );
}

export default SignInRoute;