"use client"
import {Label} from "@/components/ui/label"
import {useState} from "react"
import {Input} from "@/components/ui/input"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement>{}

interface IUser {
    email: string,
    password: string
}

export function UserLoginForm({ className, ...props }): UserAuthFormProps){

    const [data, setData] = useState<IUser>({
        email:"",
        password: ""
    })

    const [isLoading, setIsLoading ] = useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)


        setIsLoading(false)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setData((prev) => {

            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (

        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"

                            autoCapitalize="none"

                            autoComplete="email"

                            autoCorrect="off"
                            disabled={isLoading}
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>

        </div>
    )
}
