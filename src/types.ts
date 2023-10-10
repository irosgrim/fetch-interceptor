export type RequestInterceptor = (url: string, config: any) => [string, any];
export type ResponseInterceptor = (response: Response) => Promise<Response>;


export type Interceptors = {
    request: RequestInterceptor[];
    response: ResponseInterceptor[];
}
