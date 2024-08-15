import clsx from 'clsx';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface ValidationErrorTableProps {
    errors: { [key: number]: string[] | undefined };
}
const ValidationErrorTable: React.FC<ValidationErrorTableProps> = ({ errors }) => (
    <Table>
        <TableCaption>Please fix these errors in the Excel file.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-28">Row number</TableHead>
                <TableHead>Errors</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody className="bg-rose-500 text-rose-50">
            {Object.entries(errors).map(([lineNumber, errorMessages], index) => (
                <TableRow key={lineNumber}>
                    <TableCell
                        className={clsx({
                            'font-medium': true,
                            'rounded-tl-lg': !index,
                            'rounded-bl-lg': Object.entries(errors).length - 1 === index,
                        })}
                    >
                        {+lineNumber + 2}
                    </TableCell>
                    <TableCell
                        className={clsx({
                            'rounded-tr-lg': !index,
                            'rounded-br-lg': Object.entries(errors).length - 1 === index,
                        })}
                    >
                        <ul>{errorMessages?.map((message, index) => <li key={index}>{message}</li>)}</ul>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default ValidationErrorTable;
