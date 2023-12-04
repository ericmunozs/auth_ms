import { IAuthRequest } from "../models/pg/authInterfaces.js";

export interface IAuthRequestBody {
	body: IAuthRequest
}

export interface IAuthResponseJson {
	token?: string
	error?: string
	message?: string
}

export interface IAuthResponse {
	json: (data: IAuthResponseJson) => IAuthResponse
	status: (code: number) => IAuthResponse
}