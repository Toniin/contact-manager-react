import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {getContact, getContacts, renameContact} from "@/redux/actions/contact.action";
import {LuLoader2} from "react-icons/lu";
import {toast} from "sonner";
import {isNotEditing} from "@/redux/reducers/isEditingReducer";
import {phoneFormatInternational_FR_fr} from "@/lib/phone.validator";

const formSchema = z.object({
    name: z.string().min(1, {message: "Please enter name"}),
})

function RenameContactForm({contact}: { contact: { name: string, phoneNumber: string } }) {
    const contacts = useAppSelector(state => state.contacts)
    const dispatch = useAppDispatch()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: contact.name,
        },
    })

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        // Promise of 1s to show the loading button when form is submitting
        await new Promise((resolve) => {
            return setTimeout(() => {
                resolve(true)
            }, 1000)
        })

        const renamedContact = {
            name: formData.name,
            phoneNumber: phoneFormatInternational_FR_fr(contact.phoneNumber),
        }

        if (formData.name !== contact.name) {
            dispatch(renameContact(renamedContact))
                .then(
                    (response) => {
                        if (response.payload.length === 0) {
                            toast.error("You do not have permission", {
                                action: {
                                    label: "X",
                                    onClick: () => null,
                                },
                            })
                            return;
                        }

                        if (contacts.length > 1) {
                            dispatch(getContacts())
                        } else {
                            dispatch(getContact(renamedContact.phoneNumber))
                        }

                        toast.success(response.payload.message, {
                            description: `Contact with phone ${contact.phoneNumber} is renamed`,
                            action: {
                                label: "X",
                                onClick: () => null,
                            },
                        })
                    }
                )
        }

        dispatch(isNotEditing())
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel hidden={true}>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} autoFocus={true}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting &&
                        <LuLoader2 className="animate-spin h-5 w-5 mr-3"/>
                    }
                    Save
                </Button>
            </form>
        </Form>
    )
}

export default RenameContactForm;