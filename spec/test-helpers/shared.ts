export const responseWithJson = (responseJson?: any): Response => {
    const response: Response = new Response();
    response.json = () => Promise.resolve(responseJson || null);
    return response;
};
