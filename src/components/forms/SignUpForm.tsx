import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "@/redux/hooks";
import {toast} from "sonner";
import {LuLoader2} from "react-icons/lu";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {SignUpFormUser, signUpSchema} from "@/models/user.model";
import {signUp} from "@/redux/actions/user.action";
import {useState} from "react";

function SignUpForm() {
    const [errorSubmit, setErrorSubmit] = useState({
        isError: false,
        message: ""
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const form = useForm<SignUpFormUser>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            password: "",
            role: "USER"
        },
    })

    const {isSubmitting} = form.formState

    const onSubmit = async (newUser: SignUpFormUser) => {

        // Promise of 1s to show the loading button when form is submitting
        await new Promise((resolve) => {
            return setTimeout(() => {
                resolve(true)
            }, 1000)
        })
        dispatch(signUp(newUser))
            .then(() => {
                    toast.success("User sign up successfully", {
                        description: `${newUser.username} is sign up with role : ${newUser.role}`,
                        action: {
                            label: "X",
                            onClick: () => null,
                        },
                    })

                    setErrorSubmit({
                        isError: false,
                        message: ""
                    })
                    navigate("/sign-in")
                }
            ).catch(error => {
            setErrorSubmit({
                isError: true,
                message: error.message
            })
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} autoFocus={true}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="****" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({field}) => (
                        <FormItem className="space-y-5">
                            <FormLabel>Your role</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex items-center space-x-10"
                                >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="USER"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            USER
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="ADMIN"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">ADMIN</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {errorSubmit && <p className="text-red-500">{errorSubmit.message}</p>}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting &&
                        <LuLoader2 className="animate-spin h-5 w-5 mr-3"/>
                    }
                    Sign up
                </Button>
            </form>
        </Form>
    )
}

export default SignUpForm;