import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useAppSelector} from '@/redux/hooks'
import RenameContactForm from "@/components/forms/RenameContactForm";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

function ContactsTable<TData, TValue>({
                                          columns,
                                          data,
                                      }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const isOnEdit = useAppSelector(state => state.isEditing)

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-slate-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead className="font-bold" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}
                                               className={`relative 
                                                   ${cell.column.id === "contactIcon" ? "w-0" : ""}
                                                       ${cell.column.id === "phoneNumber" ? "w-1/4" : ""}
                                                   `}
                                    >
                                        {isOnEdit.value && row.getValue<string>("phoneNumber") === isOnEdit.phoneNumber && cell.column.columnDef.id === "name" ?
                                            <RenameContactForm contact={{
                                                name: row.getValue<string>("name"),
                                                phoneNumber: row.getValue<string>("phoneNumber")
                                            }}/>
                                            :
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        }
                                    </TableCell>

                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default ContactsTable
