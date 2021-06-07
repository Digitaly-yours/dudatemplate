"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// @ts-ignore
const fetch = require("node-fetch");
// @ts-ignore
const headers_1 = require("headers");
const { API_BASE = '', API_USER = '', API_PASS = '' } = process.env;
async function handler(event) {
    var response = {
        body: '',
        statusCode: 400,
        headers: headers_1.default.response
    };
    try {
        const result = await getSites();
        response.statusCode = result.statusCode;
        if (result.error) {
            result.statusCode == 403 ? response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": "Unable to authenticate with the Duda API"
            }) : response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": "Unknown error."
            });
        }
        else {
            response.body = JSON.stringify(result);
        }
    }
    catch (e) {
        response.body = JSON.stringify({
            "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
            "description": e
        });
    }
    return response;
}
exports.handler = handler;
const getSites = async function () {
    const url = `${API_BASE}/sites/multiscreen/templates`;
    const options = {
        method: 'GET',
        headers: headers_1.default.request(API_USER, API_PASS)
    };
    const response = await fetch(url, options);
    if (response.error) {
        var result = {
            statusCode: 500,
            error: true,
            message: ''
        };
        result.statusCode = response.statusCode;
        result.error = response.error;
        const error = await response.json();
        result.message = error.message;
        return result;
    }
    else {
        return await response.json();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYixxQ0FBNkI7QUFDN0IsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQTtBQUU1RCxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQVU7SUFFdEMsSUFBSSxRQUFRLEdBQUc7UUFDYixJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFLGlCQUFPLENBQUMsUUFBUTtLQUMxQixDQUFBO0lBRUQsSUFBSTtRQUVGLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUE7UUFDL0IsUUFBUSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFBO1FBRXZDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUN0RCxPQUFPLEVBQUUsZ0NBQWdDO2dCQUN6QyxhQUFhLEVBQUUsMENBQTBDO2FBQzVELENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsZ0NBQWdDO2dCQUN6QyxhQUFhLEVBQUUsZ0JBQWdCO2FBQ2hDLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTCxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDdkM7S0FFRjtJQUFDLE9BQU0sQ0FBQyxFQUFFO1FBRVQsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLE9BQU8sRUFBRSxvQkFBb0IsS0FBSyxDQUFDLFVBQVUsZ0JBQWdCLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDN0UsYUFBYSxFQUFFLENBQUM7U0FDakIsQ0FBQyxDQUFBO0tBRUg7SUFFRCxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDO0FBbkNELDBCQW1DQztBQUVELE1BQU0sUUFBUSxHQUFHLEtBQUs7SUFFbEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxRQUFRLDhCQUE4QixDQUFBO0lBRXJELE1BQU0sT0FBTyxHQUFHO1FBQ2QsTUFBTSxFQUFFLEtBQUs7UUFDYixPQUFPLEVBQUUsaUJBQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztLQUM3QyxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBRTFDLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtRQUVsQixJQUFJLE1BQU0sR0FBRztZQUNYLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUE7UUFFRCxNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUE7UUFDdkMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFBO1FBQzdCLE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQTtRQUU5QixPQUFPLE1BQU0sQ0FBQTtLQUVkO1NBQU07UUFFTCxPQUFPLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0tBRTdCO0FBRUwsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWlnbm9yZVxuaW1wb3J0ICogYXMgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBoZWFkZXJzIGZyb20gJ2hlYWRlcnMnXG5jb25zdCB7IEFQSV9CQVNFID0gJycsIEFQSV9VU0VSID0gJycsIEFQSV9QQVNTID0gJycgfSA9IHByb2Nlc3MuZW52XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBhbnkpIHtcblxuICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgYm9keTogJycsXG4gICAgc3RhdHVzQ29kZTogNDAwLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMucmVzcG9uc2VcbiAgfVxuXG4gIHRyeSB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRTaXRlcygpXG4gICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9IHJlc3VsdC5zdGF0dXNDb2RlXG5cbiAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICByZXN1bHQuc3RhdHVzQ29kZSA9PSA0MDMgPyByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBcbiAgICAgICAgICBcImVycm9yXCI6IFwiRHVkYSBBUEkgcmVzcG9uZGVkIHdpdGggZXJyb3IuXCIsXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlVuYWJsZSB0byBhdXRoZW50aWNhdGUgd2l0aCB0aGUgRHVkYSBBUElcIiBcbiAgICAgIH0pIDogcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgIFwiZXJyb3JcIjogXCJEdWRhIEFQSSByZXNwb25kZWQgd2l0aCBlcnJvci5cIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlVua25vd24gZXJyb3IuXCIgXG4gICAgICB9KSBcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdClcbiAgICB9XG5cbiAgfSBjYXRjaChlKSB7XG5cbiAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgXCJlcnJvclwiOiBgUHJvYmxlbSBoYW5kbGluZyAke2V2ZW50Lmh0dHBNZXRob2R9IG9uIHJlc291cmNlICR7ZXZlbnQucmVzb3VyY2V9YCxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogZVxuICAgIH0pXG5cbiAgfVxuXG4gIHJldHVybiByZXNwb25zZVxufVxuXG5jb25zdCBnZXRTaXRlcyA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgdXJsID0gYCR7QVBJX0JBU0V9L3NpdGVzL211bHRpc2NyZWVuL3RlbXBsYXRlc2BcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5yZXF1ZXN0KEFQSV9VU0VSLCBBUElfUEFTUylcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucylcbiAgICBcbiAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcblxuICAgICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTogJydcbiAgICAgIH1cbiAgXG4gICAgICByZXN1bHQuc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1c0NvZGVcbiAgICAgIHJlc3VsdC5lcnJvciA9IHJlc3BvbnNlLmVycm9yXG4gICAgICBjb25zdCBlcnJvciA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlXG4gIFxuICAgICAgcmV0dXJuIHJlc3VsdFxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG4gICAgfVxuXG59XG4iXX0=