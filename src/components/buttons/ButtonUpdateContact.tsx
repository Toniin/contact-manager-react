import {LuPencil} from "react-icons/lu";
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {Button} from "@/components/ui/button";
import {isEditing, isNotEditing} from "@/redux/reducers/isEditingReducer";

function ButtonUpdateContact({phoneNumber}: { phoneNumber: string }) {
    const isOnEdit = useAppSelector(state => state.isEditing)
    const dispatch = useAppDispatch();

    const onEditContact = () => {
        dispatch(isEditing(phoneNumber))
    }

    const onCancelEditContact = () => {
        dispatch(isNotEditing())
    }

    if (isOnEdit.value && phoneNumber === isOnEdit.phoneNumber) {
        return (
            <Button variant="outline" size="icon" onClick={onCancelEditContact}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-x">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                </svg>
            </Button>
        );
    }

    return (
        <Button variant="outline" size="icon" onClick={onEditContact}>
            <LuPencil/>
        </Button>
    );
}

export default ButtonUpdateContact;