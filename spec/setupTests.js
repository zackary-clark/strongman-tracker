import "@testing-library/jest-dom";
import * as fetchPolyfill from "whatwg-fetch";

global.fetch = fetchPolyfill.fetch;
global.Request = fetchPolyfill.Request;
global.Headers = fetchPolyfill.Headers;
global.Response = fetchPolyfill.Response;
