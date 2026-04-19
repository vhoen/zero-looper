import { encodeData, decodeData, generateUrl, extractDataFromHash } from '../../src/utils/encoding.js';

describe('Encoding Utils', () => {
    const validData = {
        url: 'https://www.youtube.com/watch?v=I3jWsoQ8W8g',
        loops: [
            { name: 'Solo', start: 10, end: 30 }
        ]
    };

    describe('encodeData', () => {
        it('should encode valid data', () => {
            const encoded = encodeData(validData);
            expect(typeof encoded).toBe('string');
            expect(encoded.length > 0).toBe(true);
        });

        it('should encode empty data', () => {
            const data = { url: '', loops: [] };
            const encoded = encodeData(data);
            expect(typeof encoded).toBe('string');
        });

        it('should throw error if data cannot be serialized', () => {
            const circular = { url: '' };
            circular.self = circular;
            expect(() => encodeData(circular)).toThrow();
        });
    });

    describe('decodeData', () => {
        it('should decode valid encoded data', () => {
            const encoded = encodeData(validData);
            const decoded = decodeData(encoded);
            expect(decoded).toEqual(validData);
        });

        it('should throw error for invalid base64', () => {
            expect(() => decodeData('!!!invalid!!!')).toThrow();
        });

        it('should throw error for invalid JSON', () => {
            const invalidJson = Buffer.from('not a json', 'utf8').toString('base64');
            expect(() => decodeData(invalidJson)).toThrow();
        });

        it('should throw error for invalid structure', () => {
            const invalidStructure = Buffer.from(JSON.stringify({ data: 'missing url and loops' }), 'utf8').toString('base64');
            expect(() => decodeData(invalidStructure)).toThrow();
        });

        it('should throw error if encoded is empty', () => {
            expect(() => decodeData('')).toThrow();
        });

        it('should throw error if encoded is not a string', () => {
            expect(() => decodeData(null)).toThrow();
            expect(() => decodeData(undefined)).toThrow();
        });
    });

    describe('generateUrl', () => {
        it('should generate URL with encoded data', () => {
            const url = generateUrl(validData, 'http://localhost:8181');
            expect(url).toContain('http://localhost:8181');
            expect(url).toContain('#');
        });

        it('should generate URL without base URL', () => {
            const url = generateUrl(validData, '');
            expect(url).toContain('#');
        });

        it('should encode the same data consistently', () => {
            const url1 = generateUrl(validData, 'http://localhost:8181');
            const url2 = generateUrl(validData, 'http://localhost:8181');
            expect(url1).toBe(url2);
        });
    });

    describe('extractDataFromHash', () => {
        it('should extract data from valid hash', () => {
            const encoded = encodeData(validData);
            const extracted = extractDataFromHash(encoded);
            expect(extracted).toEqual(validData);
        });

        it('should return null for empty hash', () => {
            expect(extractDataFromHash('')).toBeNull();
        });

        it('should return null for invalid hash', () => {
            expect(extractDataFromHash('!!!invalid!!!')).toBeNull();
        });

        it('should return null for null', () => {
            expect(extractDataFromHash(null)).toBeNull();
        });
    });
});
