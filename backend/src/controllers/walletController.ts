import { Request, Response, NextFunction } from "express";
import { ApiResponse, Wallet } from "../types";

let wallets: Wallet[] = [
    { id: 1, ownerName: "Allie Dawn", ownerEmail: "allie@gmail.com", currency: "RUB", amount: 23980, createdAt: new Date()}
]

export const getWallets = (req: Request, res: Response, next: NextFunction) => {
    try{
        const response: ApiResponse<Wallet[]> = {
            success: true,
            data: wallets
        }

        res.json(response)
    }
    catch(err){
        next(err)
    }
}

export const getWalletByID = (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params.id as string)

        const wallet = wallets.find(el => el.id === id)

        if (!wallet){
            res.status(404).json({
                success: false,
                error: "Wallet not found"
            })
        }

        const response: ApiResponse<Wallet> = {
            success: true,
            data: wallet
        }

        res.json(response)
    }
    catch(err){
        next(err)
    }
}

export const getWalletByEmail = (req: Request, res: Response, next: NextFunction) => {
    try{
        const email = req.params.email

        const wallet = wallets.find(el => el.ownerEmail === email)

        if (!wallet){
            res.status(404).json({
                success: false,
                error: "Wallet not found"
            })
        }

        const response: ApiResponse<Wallet> = {
            success: true,
            data: wallet
        }

        res.json(response)
    }
    catch(err){
        next(err)
    }
}

export const createWallet = (req: Request, res: Response, next: NextFunction) => {
    try{
        const { name, email, currency, amount } = req.body

        const newWallet: Wallet = {
            id: wallets.length + 1,
            ownerName: name,
            ownerEmail: email,
            currency: currency,
            amount: amount,
            createdAt: new Date()
        }

        wallets.push(newWallet)

        const response: ApiResponse<Wallet> = {
            success: true,
            data: newWallet,
            message: "New wallet created successfully"
        }

        res.status(201).json(response)
    }
    catch(err){
        next(err)
    }
}

export const changeWalletAmount = (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params.id as string)

        const { amount } = req.body
        const walletIndex = wallets.findIndex(el => el.id === id)
        
        if (walletIndex === -1){
            res.status(404).json({
                success: false,
                error: "Wallet not found"
            })
        }

        wallets[walletIndex] = { ...wallets[walletIndex], amount }

        const response: ApiResponse<Wallet> = {
            success: true,
            data: wallets[walletIndex],
            message: "Wallet updated successfully"
        }

        res.json(response)
    }
    catch(err){
        next(err)
    }
}

export const deleteWallet = (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = parseInt(req.params.id as string)
        const walletExists = wallets.find(el => el.id === id)

        if (!walletExists){
            res.status(404).json({
                success: false,
                error: "Wallet not found"
            })
        }

        wallets = wallets.filter(el => el.id !== id)

        res.status(204).send()
    }
    catch(err){
        next(err)
    }
}