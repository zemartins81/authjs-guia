"use client"
import {Label} from "@/components/ui/label"
import React, {useState} from "react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { cn } from "@/lib/utils"


interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement>{}

interface IUser {
    name: string,
    email: string,
    password: string
}

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {

    const [data, setData] = useState<IUser>({
        name: "",
        email:"",
        password: "",
    })

    const [isLoading, setIsLoading ] = useState<boolean>(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        const request = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
            body: JSON.stringify(data),
        })

        const response = await request.json()

        if(!request.ok) {
            throw new Error(response.message)
        }


        setData({
            name: "",
            email: "",
            password: "",
        })

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
                        <Label className="sr-only" htmlFor="name">
                            Nome
                        </Label>
                        <Input
                            id="name"
                            placeholder="Nome completo"
                            type="text"
                            disabled={isLoading}
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"
                        )}
                                Entrar
                    </Button>
                </div>
            </form>

        </div>
    )
}
