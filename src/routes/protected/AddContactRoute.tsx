import AddContactForm from "@/components/forms/AddContactForm";
import {LuArrowLeft} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

function AddContactRoute() {
    const navigate = useNavigate();

    return (
        <div className="container w-1/2 py-10">
            <Button onClick={() => navigate(-1)}>
                <LuArrowLeft className="mr-2 h-4 w-4"/> Return
            </Button>
            <div className="flex flex-col items-center">
                <h2 className="pt-5 pb-10 text-4xl">Add new conact</h2>
                <AddContactForm/>
            </div>
        </div>
    );
}

export default AddContactRoute;