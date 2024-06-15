import { Input } from "@/components/ui/input"

interface IProps {
    type: string;
    placeholder: string
    icon: React.ReactNode
}

export function InputSearchComponent({ type, placeholder, icon }: IProps) {
    return (
        <div className="flex gap-x-2 py-1 items-center  w-96 border-2 rounded-lg ">
            <Input type={type} placeholder={placeholder} className="outline-none border-0" />
            <div className="p-2">
                {icon}

            </div>

        </div>
    )
}
