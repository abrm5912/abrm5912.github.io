import { fakeFetchExchange, fetchExchange } from './fetchExchange';

describe('fetchExchange', () => {
    it('should return an array of objects', async () => {
        const response = await fetchExchange();
        expect(response).toEqual(expect.any(Array));
        expect(response).toEqual(expect.arrayContaining([
            expect.objectContaining({
                ccy: expect.any(String),
                base_ccy: expect.any(String),
                buy: expect.any(String),
                sale: expect.any(String),
            }),
        ]));
    });

    it('should throw an error', async () => {
        await expect(fakeFetchExchange()).rejects.toThrow('Internal server error');
    });
});
