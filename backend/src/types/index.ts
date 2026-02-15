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