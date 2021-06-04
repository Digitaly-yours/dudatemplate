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
        const templateId = JSON.parse(event.body).templateId;
        const result = await createSite(templateId);
        response.statusCode = result.statusCode;
        if (result.error) {
            result.statusCode == 403 ? response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": "Unable to authenticate with the Duda API"
            }) : response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": JSON.stringify(result.message)
            });
        }
        else {
            response.body = JSON.stringify({
                'siteName': result['site_name']
            });
        }
    }
    catch (e) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
            "description": e
        });
    }
    return response;
}
exports.handler = handler;
const createSite = async function (template) {
    const url = `${API_BASE}/sites/multiscreen/create`;
    const options = {
        method: 'POST',
        headers: headers_1.default.request(API_USER, API_PASS),
        body: JSON.stringify({
            template_id: template
        })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYixxQ0FBNkI7QUFDN0IsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQTtBQUU1RCxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQVU7SUFFdEMsSUFBSSxRQUFRLEdBQUc7UUFDYixJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFLGlCQUFPLENBQUMsUUFBUTtLQUMxQixDQUFBO0lBRUQsSUFBSTtRQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQTtRQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUMzQyxRQUFRLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7UUFFdkMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ3hELE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLGFBQWEsRUFBRSwwQ0FBMEM7YUFDMUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDOUMsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUM7YUFDaEMsQ0FBQyxDQUFBO1NBQ0g7S0FFRjtJQUFDLE9BQU0sQ0FBQyxFQUFFO1FBRVQsUUFBUSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7UUFDekIsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLE9BQU8sRUFBRSxvQkFBb0IsS0FBSyxDQUFDLFVBQVUsZ0JBQWdCLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDN0UsYUFBYSxFQUFFLENBQUM7U0FDakIsQ0FBQyxDQUFBO0tBRUg7SUFFRCxPQUFPLFFBQVEsQ0FBQTtBQUVqQixDQUFDO0FBeENELDBCQXdDQztBQUVELE1BQU0sVUFBVSxHQUFHLEtBQUssV0FBVSxRQUFnQjtJQUU5QyxNQUFNLEdBQUcsR0FBRyxHQUFHLFFBQVEsMkJBQTJCLENBQUE7SUFFbEQsTUFBTSxPQUFPLEdBQUc7UUFDZCxNQUFNLEVBQUUsTUFBTTtRQUNkLE9BQU8sRUFBRSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQzVDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ25CLFdBQVcsRUFBRSxRQUFRO1NBQ3RCLENBQUM7S0FDSCxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzFDLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtRQUVsQixJQUFJLE1BQU0sR0FBRztZQUNYLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUE7UUFFRCxNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUE7UUFDdkMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFBO1FBQzdCLE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQTtRQUU5QixPQUFPLE1BQU0sQ0FBQTtLQUVkO1NBQU07UUFFTCxPQUFPLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0tBRTdCO0FBRUwsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWlnbm9yZVxuaW1wb3J0ICogYXMgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBoZWFkZXJzIGZyb20gJ2hlYWRlcnMnXG5jb25zdCB7IEFQSV9CQVNFID0gJycsIEFQSV9VU0VSID0gJycsIEFQSV9QQVNTID0gJycgfSA9IHByb2Nlc3MuZW52XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBhbnkpIHtcblxuICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgYm9keTogJycsXG4gICAgc3RhdHVzQ29kZTogNDAwLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMucmVzcG9uc2VcbiAgfVxuXG4gIHRyeSB7XG5cbiAgICBjb25zdCB0ZW1wbGF0ZUlkID0gSlNPTi5wYXJzZShldmVudC5ib2R5KS50ZW1wbGF0ZUlkXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY3JlYXRlU2l0ZSh0ZW1wbGF0ZUlkKVxuICAgIHJlc3BvbnNlLnN0YXR1c0NvZGUgPSByZXN1bHQuc3RhdHVzQ29kZVxuXG4gICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgcmVzdWx0LnN0YXR1c0NvZGUgPT0gNDAzID8gcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgIFwiZXJyb3JcIjogXCJEdWRhIEFQSSByZXNwb25kZWQgd2l0aCBlcnJvci5cIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlVuYWJsZSB0byBhdXRoZW50aWNhdGUgd2l0aCB0aGUgRHVkYSBBUElcIiBcbiAgICAgIH0pIDogcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgIFwiZXJyb3JcIjogXCJEdWRhIEFQSSByZXNwb25kZWQgd2l0aCBlcnJvci5cIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBKU09OLnN0cmluZ2lmeShyZXN1bHQubWVzc2FnZSkgIFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgJ3NpdGVOYW1lJzogcmVzdWx0WydzaXRlX25hbWUnXVxuICAgICAgfSlcbiAgICB9XG5cbiAgfSBjYXRjaChlKSB7XG5cbiAgICByZXNwb25zZS5zdGF0dXNDb2RlID0gNTAwXG4gICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIFwiZXJyb3JcIjogYFByb2JsZW0gaGFuZGxpbmcgJHtldmVudC5odHRwTWV0aG9kfSBvbiByZXNvdXJjZSAke2V2ZW50LnJlc291cmNlfWAsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IGVcbiAgICB9KVxuXG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2VcblxufVxuXG5jb25zdCBjcmVhdGVTaXRlID0gYXN5bmMgZnVuY3Rpb24odGVtcGxhdGU6IHN0cmluZykge1xuXG4gICAgY29uc3QgdXJsID0gYCR7QVBJX0JBU0V9L3NpdGVzL211bHRpc2NyZWVuL2NyZWF0ZWBcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMucmVxdWVzdChBUElfVVNFUiwgQVBJX1BBU1MpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB0ZW1wbGF0ZV9pZDogdGVtcGxhdGVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICBcbiAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICB9XG4gIFxuICAgICAgcmVzdWx0LnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXNDb2RlXG4gICAgICByZXN1bHQuZXJyb3IgPSByZXNwb25zZS5lcnJvclxuICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIHJlc3VsdC5tZXNzYWdlID0gZXJyb3IubWVzc2FnZVxuICBcbiAgICAgIHJldHVybiByZXN1bHRcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKClcblxuICAgIH1cblxufSJdfQ==