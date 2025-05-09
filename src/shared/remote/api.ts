import axios, { AxiosInstance } from "axios";
import { enviroment } from "../enviroments/enviroment.env";
import { consoleLog } from "../helpers/log.helper";

export class AxiosRequest {
  private readonly urlBase: string;
  private instanceAxios: AxiosInstance | null = null;
  private authToken = "";

  constructor() {
    this.urlBase = enviroment.api.url;
    this.executeBuilder();
  }

  public setAuthToken = (token: string) => {
    this.authToken = token;
  };

  private readonly createInstance = () => {
    const instance = axios.create({
      baseURL: this.urlBase,
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use((config) => {
      if (this.authToken) {
        config.headers["Authorization"] = `Bearer ${this.authToken}`;
      }
      return config;
    });

    return instance;
  };

  private readonly executeBuilder = () => {
    this.instanceAxios = this.createInstance();
    this.instanceAxios.interceptors.response.use((opt) => {
      consoleLog("Code: ", opt.status);
      return opt;
    });
    this.instanceAxios.interceptors.request.use((opt: any) => {
      consoleLog(
        opt.baseURL + opt.url,
        opt.method,
        opt.data ? "Data: " + JSON.stringify(opt.data) : ""
      );
      return opt;
    });
  };

  public ExecutePetition = async (
    url: string,
    method: string,
    data: any = null,
    headers: any = {}
  ) => {
    try {
      const config = {
        method: method.toLowerCase(),
        url,
        headers: {
          ...this.instanceAxios?.defaults.headers.common,
          ...headers,
        },
        data,
      };

      const res = await this.instanceAxios?.request(config);
      return res?.data;
    } catch (e) {
      throw e;
    }
  };
}
