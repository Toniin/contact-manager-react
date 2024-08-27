import DataTable from "@/components/table/ContactsTable"
import {columns} from "@/components/table/ColumnsTable";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {getContacts} from "@/redux/actions/contact.action";

function ContactsTable() {
    const contacts = useAppSelector(state => state.contacts)
    const dispatch = useAppDispatch()

    useEffect(() => {
            dispatch(getContacts())
    }, [dispatch]);

    return (
        <>
            {contacts ?
                <DataTable columns={columns} data={contacts}/>
                : null}
        </>
    );
}

export default ContactsTable;