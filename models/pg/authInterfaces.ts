export interface IDBConfig {
	host: string
	port: number
	database: string
	user: string
	password: string
}

export interface IAuthRequest {
	usernameOrEmail: string
	password: string
}

export interface IAuthResponse {
	token: string
}

export interface IAuthModel {
	verifyCredentials: (credentials: IAuthRequest) => Promise<IAuthResponse | null>
}