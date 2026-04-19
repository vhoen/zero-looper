import { getYoutubeVideoId, isValidYoutubeUrl } from '../../src/utils/youtube.js';

describe('YouTube Utils', () => {
    describe('getYoutubeVideoId', () => {
        it('should extract video ID from youtube.com watch URL', () => {
            const url = 'https://www.youtube.com/watch?v=I3jWsoQ8W8g';
            expect(getYoutubeVideoId(url)).toBe('I3jWsoQ8W8g');
        });

        it('should extract video ID from youtu.be short URL', () => {
            const url = 'https://youtu.be/I3jWsoQ8W8g';
            expect(getYoutubeVideoId(url)).toBe('I3jWsoQ8W8g');
        });

        it('should extract video ID from URL with query parameters', () => {
            const url = 'https://www.youtube.com/watch?v=I3jWsoQ8W8g&t=10s&list=PLxxxxx';
            expect(getYoutubeVideoId(url)).toBe('I3jWsoQ8W8g');
        });

        it('should return null for invalid URL', () => {
            const url = 'https://www.youtube.com/watch?v=invalid';
            expect(getYoutubeVideoId(url)).toBeNull();
        });

        it('should return null for empty string', () => {
            expect(getYoutubeVideoId('')).toBeNull();
        });

        it('should return null for non-YouTube URL', () => {
            const url = 'https://www.google.com';
            expect(getYoutubeVideoId(url)).toBeNull();
        });
    });

    describe('isValidYoutubeUrl', () => {
        it('should return true for valid YouTube URL', () => {
            const url = 'https://www.youtube.com/watch?v=I3jWsoQ8W8g';
            expect(isValidYoutubeUrl(url)).toBe(true);
        });

        it('should return false for invalid URL', () => {
            const url = 'https://www.youtube.com/watch?v=invalid';
            expect(isValidYoutubeUrl(url)).toBe(false);
        });

        it('should return false for empty string', () => {
            expect(isValidYoutubeUrl('')).toBe(false);
        });
    });
});
