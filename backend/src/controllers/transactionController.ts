import { Request, Response, NextFunction } from "express";
import { ApiResponse, Transaction, Wallet } from "../types";

let transactions: Transaction[] = [];

export const transferAmount = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fromWalletId, toWalletId, amount, description } = req.body;

        if (!fromWalletId || !toWalletId || !amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                error: "Invalid transfer data. Required: fromWalletId, toWalletId, amount > 0"
            });
        }

        const { wallets } = require('./walletController');
        
        const fromWallet = wallets.find((w: Wallet) => w.id === fromWalletId);
        const toWallet = wallets.find((w: Wallet) => w.id === toWalletId);

        if (!fromWallet) {
            return res.status(404).json({
                success: false,
                error: "Source wallet not found"
            });
        }

        if (!toWallet) {
            return res.status(404).json({
                success: false,
                error: "Destination wallet not found"
            });
        }

        if (fromWallet.amount < amount) {
            return res.status(400).json({
                success: false,
                error: "Insufficient funds"
            });
        }

        if (fromWallet.currency !== toWallet.currency) {
            return res.status(400).json({
                success: false,
                error: "Currency mismatch. Cannot transfer between different currencies"
            });
        }

        fromWallet.amount -= amount;
        toWallet.amount += amount;

        const newTransaction: Transaction = {
            id: transactions.length + 1,
            fromWalletId,
            toWalletId,
            amount,
            currency: fromWallet.currency,
            description: description || `Transfer from ${fromWallet.ownerName} to ${toWallet.ownerName}`,
            status: 'completed',
            createdAt: new Date()
        };

        transactions.push(newTransaction);

        const response: ApiResponse<Transaction> = {
            success: true,
            data: newTransaction,
            message: "Transfer completed successfully"
        };

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

export const getTransactions = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { walletId } = req.query;

        let filteredTransactions = transactions;

        if (walletId) {
            const id = parseInt(walletId as string);
            filteredTransactions = transactions.filter(
                t => t.fromWalletId === id || t.toWalletId === id
            );
        }

        const response: ApiResponse<Transaction[]> = {
            success: true,
            data: filteredTransactions
        };

        res.json(response);
    } catch (err) {
        next(err);
    }
};

export const getTransactionById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const transaction = transactions.find(t => t.id === id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: "Transaction not found"
            });
        }

        const response: ApiResponse<Transaction> = {
            success: true,
            data: transaction
        };

        res.json(response);
    } catch (err) {
        next(err);
    }
};

export const getUserTransactions = (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.params.email;

        const { wallets } = require('./walletController');

        const userWallets = wallets.filter((w: Wallet) => w.ownerEmail === email);
        const walletIds = userWallets.map((w: Wallet) => w.id);


        const userTransactions = transactions.filter(
            t => walletIds.includes(t.fromWalletId) || walletIds.includes(t.toWalletId)
        );

        const response: ApiResponse<Transaction[]> = {
            success: true,
            data: userTransactions
        };

        res.json(response);
    } catch (err) {
        next(err);
    }
};