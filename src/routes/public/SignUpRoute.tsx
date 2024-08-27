import SignUpForm from "@/components/forms/SignUpForm";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

function SignUpRoute() {
    const navigate = useNavigate();

    return (
        <div className="container flex flex-col items-center py-10">
            <div className="flex flex-col">
                <h2 className="pb-10 text-4xl">Sign up</h2>
                <SignUpForm/>
            </div>
            <div className="flex items-center pt-8">
                <p>Already have an account ?</p>
                <Button variant="link" className="text-blue-500" onClick={() => navigate("/sign-in")}>
                    Sign in
                </Button>
            </div>
        </div>
    );
}

export default SignUpRoute;