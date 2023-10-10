import { Interceptors, RequestInterceptor, ResponseInterceptor } from "./types";

export class FetchInterceptor {
    private interceptors: Interceptors = {
        request: [],
        response: []
      };
  
    async interceptRequest(url: string, config: any) {
      for (const interceptor of this.interceptors.request) {
        const result = interceptor(url, config);
        if (Array.isArray(result) && result.length === 2) {
          [url, config] = result;
        }
      }
  
      return [url, config];
  }
  
    private async interceptResponse(response: Response) {
      for (const interceptor of this.interceptors.response) {
        const modifiedResponse = await interceptor(response);
        if (modifiedResponse instanceof Response) {
          response = modifiedResponse;
        }
      }
      return response;
    }
  
    useRequestInterceptor(interceptor: RequestInterceptor) {
      this.interceptors.request.push(interceptor);
    }
  
    useResponseInterceptor(interceptor: ResponseInterceptor) {
      this.interceptors.response.push(interceptor);
    }
  
    async fetch(url: string, config = {}) {
      const [newUrl, newConfig] = await this.interceptRequest(url, config);
      return fetch(newUrl, newConfig).then(response => this.interceptResponse(response)).catch(err => this.interceptResponse(err));
    }
  }

