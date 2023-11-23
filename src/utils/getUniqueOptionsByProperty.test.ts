import { getUniqueOptionsByProperty } from './getUniqueOptionsByProperty';

describe('getUniqueOptionsByProperty', () => {
    it('should return unique options for age', () => {
        const data = [
            {
                name: 'Test1',
                age: 25
            },
            {
                name: 'Test2',
                age: 25
            },
            {
                name: 'Test3',
                age: 30
            },
            {
                name: 'Test4',
                age: 30
            },
        ];
        const result = getUniqueOptionsByProperty(data, 'age');
        expect(result).toEqual([{  label: 25, value: 25 }, { label: 30, value: 30 },]);
    });
    it('should return unique options for name', () => {
        const data = [
            {
                name: 'Test1',
                age: 25
            },
            {
                name: 'Test2',
                age: 25
            },
            {
                name: 'Test3',
                age: 30
            },
            {
                name: 'Test4',
                age: 30
            },
        ];
        const result = getUniqueOptionsByProperty(data, 'name');
        expect(result).toEqual([{ label: 'Test1', value: 'Test1' }, { label: 'Test2', value: 'Test2' }, { label: 'Test3', value: 'Test3' }, { label: 'Test4', value: 'Test4' },]);
    });
});
