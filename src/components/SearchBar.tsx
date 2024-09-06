import {LuLoader2, LuSearch} from "react-icons/lu";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {getContact} from "@/redux/actions/contact.action";
import {useAppDispatch} from "@/redux/hooks";
import {useState} from "react";
import {isSearching} from "@/redux/reducers/isSearchingReducer";
import {useHookFormMask} from 'use-mask-input';
import {phoneValidator_FR_fr} from "@/utils/phone.validator";

const formSchema = z.object({
    phoneNumber: z.string().min(9, {message: "Please enter valid phone number"})
})

function SearchBar() {
    const dispatch = useAppDispatch()
    const [error, setError] = useState({
        isError: false,
        message: ""
    });
    const [isValid, setIsValid] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: {isSubmitting},
    } = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
        }
    )

    const registerWithMask = useHookFormMask(register);

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        if (!phoneValidator_FR_fr(formData.phoneNumber)) {
            return;
        }

        // Promise of 1s to show the loading button when form is submitting
        await new Promise((resolve) => {
            return setTimeout(() => {
                resolve(true)
            }, 1000)
        })

        dispatch(getContact(formData.phoneNumber))
            .then(() => {
                reset()
                dispatch(isSearching())
                setError({
                    isError: false,
                    message: ""
                })
            })
            .catch((error) => {
                setError({
                    isError: true,
                    message: error.message,
                })
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
            <Label className="text-xl" htmlFor="phoneNumber">Search contact</Label>
            <div className="flex items-center">
                <Input className="rounded-tr-none rounded-br-none max-w-sm"
                       placeholder="(+33)1 23 45 67 89" {...registerWithMask("phoneNumber", ['(+33)9 99 99 99 99'])}
                       onChange={(e) => setIsValid(phoneValidator_FR_fr(e.target.value))}
                />
                <Button className="rounded-tl-none rounded-bl-none" type="submit" size="icon"
                        disabled={!isValid || isSubmitting}>
                    {isSubmitting ?
                        <LuLoader2 className="animate-spin h-5 w-5"/> :
                        <LuSearch className="h-5 w-5"/>
                    }
                </Button>
                {error.isError && <p className="text-xl text-red-500 ml-3">{error.message}</p>}
            </div>
        </form>

    );
}

export default SearchBar;