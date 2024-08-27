import {ColumnDef} from "@tanstack/react-table"
import {Contact} from "@/models/contact.model";
import ButtonDeleteContact from "@/components/buttons/ButtonDeleteContact";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import ButtonUpdateContact from "@/components/buttons/ButtonUpdateContact";

export const columns: ColumnDef<Contact>[] = [
    {
        id: "contactIcon",
        cell: ({row}) => {
            const sliceNameUppercase: string = row.getValue<string>("name").slice(0, 2).toUpperCase()
            const imageURL = `https://api.dicebear.com/9.x/personas/svg?seed=${row.getValue<string>("phoneNumber")}`
            return (
                <Avatar className="w-16 h-16">
                    <AvatarImage src={imageURL} alt="icon of contact"/>
                    <AvatarFallback>{sliceNameUppercase}</AvatarFallback>
                </Avatar>
            )
        }
    },
    {
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        id: "name",
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "actions",
        cell: ({row}) => {
            const phoneNumber: string = row.getValue<string>("phoneNumber")

            return (
                <div className="flex justify-end gap-3">
                    <ButtonUpdateContact phoneNumber={phoneNumber}/>
                    <ButtonDeleteContact phoneNumber={phoneNumber}/>
                </div>)

        }
    }
]
