import { ResultRequest } from "./types/ResultRequest";
//import { Response } from "cross-fetch";

export default class ApiService {

    _basePath = "http://to-do.local/api/";
    _authPath = "http://to-do.local/api/login";
    _token = "";
    
    getToken = ():string => this._token;
    setToken = (token:string) => (this._token = token);

    getResource = async (url: string) => {
      //console.log(`${this._basePath}${url}`);
        const res = await this.sendRequestWithAuthHeader(
          "GET",
          `${this._basePath}${url}`,         
        );
        return res;
    };

    createResult = async (response: Response): Promise<ResultRequest> => {
        const data = response.ok ? await response.json() : "{}";
        return { data: JSON.stringify(data), result: response.ok}
    };

    getAllTasks = async () => {
        const res = await this.getResource("tasks/");
        return res;
    };

    sendRequestWithAuthHeader = async (method: string, url:string, data?:object | FormData) => {
      const headers: { Authorization?: string } = {};
      
      if (this._token.length) {
        headers.Authorization = this._token;
      }
      const options: RequestInit = {
        method: method,
        mode: "cors",
        headers: headers,        
      };
  
      if (data instanceof FormData) {
        options.body = data; 
      } else if (data) {
        options.body = JSON.stringify(data);
      }
  
      const response = await fetch(`${url}`, options);
      return this.createResult(response);
    };

    updateTask = async (url: string, item: Object) => {
        const res = await this.sendRequestWithAuthHeader(
          "PUT",
          `${this._basePath}${url}`,
          item
        );
        return res;
    };

    deleteTask = async (url: string) => {
        const res = await this.sendRequestWithAuthHeader(
          "DELETE",
          `${this._basePath}${url}`
        );
        return res;
    };

    addTask = async (item: { [key: string]: any }) => {
      const res = await this.sendPost(`${this._basePath}task`, item);
      return res;
    };

    sendPost = async (url: string, data: { [key: string]: any }) => {
      let formData = new FormData();
      for (let key in data) {        
        formData.append(`${key}`, data[key]);
      }
      const res = await this.sendRequestWithAuthHeader("POST", url, formData);
      return res;
    };

      logIn = async (data: object) => {
        const options = {
          body: data,
        };
        const res = await this.sendRequestWithAuthHeader(
          "POST",
          this._authPath,
          data
        );
        return res;
      };

}