import { Request, Response, NextFunction } from "express";
import { User , ApiResponse } from "../types";
import { error } from "node:console";

let users: User[] = [
    { id: 1, name: "Allie Dawn", email: "allie@gmail.com", createdAt: new Date(), password: "1111"}
]

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    try{
        const response: ApiResponse<User[]> = {
            success: true,
            data: users
        }
        res.json(response)
    }
    catch(err){
        next(err)
    }
}

export const getUserByID = (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params.id as string)
        const user = users.find( el => el.id === id)

        if (!user){
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        const response: ApiResponse<User> = {
            success: true,
            data: user
        }

        res.json(response)
    }
    catch(err){
        next(err)
    }
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    try{
        const { name, email, password } = req.body

        const newUser: User = {
            id: users.length + 1,
            name,
            email,
            createdAt: new Date(),
            password
        }

        users.push(newUser)

        const response: ApiResponse<User> = {
            success: true,
            data: newUser,
            message: "User created succesfully"
        }

        res.status(201).json(response)
    }
    catch(err){
        next(err)
    }
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params.id as string)
        const { name, email, password } = req.body
        const userIndex = users.findIndex(el => el.id === id)

        if (userIndex === -1){
            res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        users[userIndex] = { ...users[userIndex], name, email, password }

        const response: ApiResponse<User> = {
            success: true,
            data: users[userIndex],
            message: "User updated successfully"
        }
        res.json(response)
    }
    catch(err){
        next(err)
    }
}

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params.id as string)
        const userExists = users.find(el => el.id === id)

        if (!userExists){
            res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        users = users.filter(el => el.id !== id)

        res.status(204).send()
    }
    catch(err){
        next(err)
    }
}