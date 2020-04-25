import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as fetchPolyfill from "whatwg-fetch";

Enzyme.configure({ adapter: new Adapter() });

global.fetch = fetchPolyfill.fetch;
global.Request = fetchPolyfill.Request;
global.Headers = fetchPolyfill.Headers;
global.Response = fetchPolyfill.Response;
