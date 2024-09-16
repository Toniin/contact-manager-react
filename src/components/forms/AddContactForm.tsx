import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/redux/hooks";
import {addContact} from "@/redux/actions/contact.action";
import {toast} from "sonner";
import {LuLoader2} from "react-icons/lu";
import {Contact, contactSchema} from "@/models/contact.model";
import {phoneValidator_FR_fr} from "@/utils/phone.validator";
import {withMask} from 'use-mask-input';

function AddContactForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const form = useForm<Contact>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
        },
    })

    const {isSubmitting} = form.formState

    const onSubmit = async (newContact: Contact) => {

        // Promise of 1s to show the loading button when form is submitting
        await new Promise((resolve) => {
            return setTimeout(() => {
                resolve(true)
            }, 1000)
        })

        if (!phoneValidator_FR_fr(newContact.phoneNumber.toString())) {
            form.setError("phoneNumber", {
                type: "manual",
                message: "Please enter valid phone number",
            })
            return;
        }

        dispatch(addContact(newContact))
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

                toast.success(response.payload.message, {
                    description: `Contact with phone ${newContact.phoneNumber} is added`,
                    action: {
                        label: "X",
                        onClick: () => null,
                    },
                })

                navigate("/contacts")
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input data-testid="inputNameAddContactForm" placeholder="John Doe" {...field} autoFocus={true}/>
                            </FormControl>
                            <FormMessage data-testid="inputNameErrorMessageAddContactForm"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input data-testid="inputPhoneNumberAddContactForm" placeholder="(+33)1 23 45 67 89" {...field} ref={withMask('(+33)9 99 99 99 99')} />
                            </FormControl>
                            <FormMessage data-testid="inputPhoneNumberErrorMessageAddContactForm"/>
                        </FormItem>
                    )}
                />
                <Button data-testid="submitButtonAddContactForm" type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting &&
                        <LuLoader2 className="animate-spin h-5 w-5 mr-3"/>
                    }
                    Add contact
                </Button>
            </form>
        </Form>
    )
}

export default AddContactForm;