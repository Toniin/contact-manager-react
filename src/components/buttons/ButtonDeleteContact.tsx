import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from '@/components/ui/button'
import {LuTrash2} from "react-icons/lu";
import {deleteContact, getContacts} from "@/redux/actions/contact.action";
import {useAppDispatch} from "@/redux/hooks";
import {toast} from "sonner"

function ButtonDeleteContact({phoneNumber}: { phoneNumber: string }) {
    const dispatch = useAppDispatch()

    const onDeleteContact = () => {
        dispatch(deleteContact(phoneNumber))
            .then((response) => {
                    if (response.payload.length === 0) {
                        toast.error("You do not have permission", {
                            action: {
                                label: "X",
                                onClick: () => null,
                            },
                        })
                        return;
                    }

                    dispatch(getContacts())

                    toast.success(response.payload.message, {
                        description: `Contact with phone ${phoneNumber} is deleted`,
                        action: {
                            label: "X",
                            onClick: () => null,
                        },
                    })
                }
            )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button data-testid="buttonTriggerDialog" variant="outline" size="icon">
                    <LuTrash2 className="stroke-red-500"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this contact ?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your contact from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button data-testid="buttonCloseDialog" type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogTrigger asChild>
                        <Button data-testid="buttonDeleteContact" variant="destructive" onClick={onDeleteContact}>
                            Delete
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ButtonDeleteContact;