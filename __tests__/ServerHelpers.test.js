const helpers = require('../server/helpers');

console.log = jest.fn();  // disable logging

describe("handleError", () => {
    test('censors data in prod', () => {
        jest.resetModules();
        process.env = {DEPLOYMENT: 'prod'};
        let response = helpers.getDefaultResponse();
        let expectedErrorMessage = "PROD ERROR MESSAGE";
        let code = 400;
        let callback = jest.fn();
        helpers.handleError("THIS SHOULD NOT BE IN BODY", response, callback, code, expectedErrorMessage);
        expect(response.body).toBeTruthy();
        expect(response.body).toEqual(expectedErrorMessage);
        expect(response.statusCode).toEqual(code);
        expect(callback.mock.calls.length).toBe(1);
    });

    test('shows debug data in test', () => {
        jest.resetModules();
        process.env = {DEPLOYMENT: 'local'};
        let response = helpers.getDefaultResponse();
        let expectedErrorMessage = {secret: 'data'};
        let code = 400;
        let callback = jest.fn();
        helpers.handleError(expectedErrorMessage, response, callback, code, 'THIS SHOULD NOT BE IN BODY');
        expect(response.body).toBeTruthy();
        expect(response.body).toEqual(JSON.stringify(expectedErrorMessage));
        expect(response.statusCode).toEqual(code);
        expect(callback.mock.calls.length).toBe(1);
    });
});
