// Fetch.ts
const API_HOST = 'https://directus-test.scriptbees.com/items';

type RequestParams = Record<string, any>;

interface ErrorResponse {
  status: "error";
  message: string;
  code?: number;
}

async function request(url: string, params?: RequestParams | null, method: string = "GET"): Promise<any> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const objectToQueryString = (obj: RequestParams): string => {
    return Object.keys(obj)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join("&");
  };

  if (params) {
    if (method === "GET") {
      url += '?' + objectToQueryString(params);
    } else {
      options.body = JSON.stringify(params);
    }
  }

  const generateErrorResponse = (message: string, code?: number): ErrorResponse => {
    const response: ErrorResponse = {
      status: "error",
      message,
    };
    return code ? { ...response, code } : response;
  };

  try {
    const response = await fetch(API_HOST + url, options);
    const result = await response.json();

    if (response.status >= 400) {
      const msg =
        typeof result === "string"
          ? result
          : "The server responded with an unexpected status.";
      return generateErrorResponse(msg);
    }

    if (result.message_type === "error") {
      const msg = result.reason || "An error occurred fetching resources.";
      const code = result.code;
      return generateErrorResponse(msg, code);
    }

    return result;
  } catch (e) {
    return generateErrorResponse("An error occurred fetching resources.");
  }
}

function get(url: string, params?: RequestParams): Promise<any> {
  return request(url, params);
}

function post(url: string, params: RequestParams): Promise<any> {
  return request(url, params, "POST");
}

function update(url: string, params: RequestParams): Promise<any> {
  return request(url, params, "PATCH");
}

function remove(url: string, params?: RequestParams): Promise<any> {
  return request(url, params, "DELETE");
}

const Fetch = {
  get,
  post,
  update,
  remove,
};

export default Fetch;
