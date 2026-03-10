export interface User {
    id: number,
    name: string,
    email: string,
    createdAt: Date
    password: string
}

export interface ApiResponse<T> {
    success: boolean,
    data?: T,
    error?: string,
    message?: string
}

export interface Wallet {
    id: number,
    ownerName: string,
    ownerEmail: string,
    currency: string,
    amount: number,
    createdAt: Date
}

export interface Transaction {
    id: number,
    fromWalletId: number,
    toWalletId: number,
    amount: number,
    currency: string,
    description: string,
    status: 'pending' | 'completed' | 'failed' | 'cancelled',
    createdAt: Date
}

export interface PaymentRequest {
    walletId: number,
    amount: number,
    currency: string,
    description?: string
}

export interface TransferRequest {
    fromWalletId: number,
    toWalletId: number,
    amount: number,
    description?: string
}