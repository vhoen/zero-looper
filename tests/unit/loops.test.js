import { createLoop, addLoop, removeLoop, initializeLoopData } from '../../src/utils/loops.js';

describe('Loops Utils', () => {
    describe('createLoop', () => {
        it('should create a valid loop', () => {
            const loop = createLoop('Solo', 10, 30);
            expect(loop).toEqual({
                name: 'Solo',
                start: 10,
                end: 30
            });
        });

        it('should trim loop name', () => {
            const loop = createLoop('  Solo  ', 10, 30);
            expect(loop.name).toBe('Solo');
        });

        it('should throw error if name is empty', () => {
            expect(() => createLoop('', 10, 30)).toThrow('Le nom de la boucle ne peut pas être vide');
        });

        it('should throw error if start >= end', () => {
            expect(() => createLoop('Solo', 30, 10)).toThrow('Le début doit être avant la fin');
            expect(() => createLoop('Solo', 30, 30)).toThrow('Le début doit être avant la fin');
        });

        it('should throw error if times are negative', () => {
            expect(() => createLoop('Solo', -1, 30)).toThrow('Les temps ne peuvent pas être négatifs');
            expect(() => createLoop('Solo', 10, -5)).toThrow('Les temps ne peuvent pas être négatifs');
        });

        it('should throw error if times are not numbers', () => {
            expect(() => createLoop('Solo', '10', 30)).toThrow('Les temps doivent être des nombres');
            expect(() => createLoop('Solo', 10, '30')).toThrow('Les temps doivent être des nombres');
        });
    });

    describe('addLoop', () => {
        it('should add a loop to empty loopData', () => {
            const loopData = { url: 'https://youtube.com/watch?v=xyz', loops: [] };
            const loop = { name: 'Solo', start: 10, end: 30 };
            
            const result = addLoop(loopData, loop);
            expect(result.loops).toHaveLength(1);
            expect(result.loops[0]).toEqual(loop);
        });

        it('should add a loop without modifying original', () => {
            const loopData = { url: 'https://youtube.com/watch?v=xyz', loops: [] };
            const loop = { name: 'Solo', start: 10, end: 30 };
            
            addLoop(loopData, loop);
            expect(loopData.loops).toHaveLength(0);
        });

        it('should add multiple loops', () => {
            let loopData = { url: 'https://youtube.com/watch?v=xyz', loops: [] };
            const loop1 = { name: 'Solo', start: 10, end: 30 };
            const loop2 = { name: 'Refrain', start: 45, end: 75 };
            
            loopData = addLoop(loopData, loop1);
            loopData = addLoop(loopData, loop2);
            
            expect(loopData.loops).toHaveLength(2);
            expect(loopData.loops[1]).toEqual(loop2);
        });
    });

    describe('removeLoop', () => {
        it('should remove a loop by index', () => {
            const loopData = {
                url: 'https://youtube.com/watch?v=xyz',
                loops: [
                    { name: 'Solo', start: 10, end: 30 },
                    { name: 'Refrain', start: 45, end: 75 }
                ]
            };
            
            const result = removeLoop(loopData, 0);
            expect(result.loops).toHaveLength(1);
            expect(result.loops[0].name).toBe('Refrain');
        });

        it('should throw error for invalid index', () => {
            const loopData = { url: 'https://youtube.com/watch?v=xyz', loops: [] };
            expect(() => removeLoop(loopData, 0)).toThrow('Index invalide');
        });

        it('should not modify original', () => {
            const loopData = {
                url: 'https://youtube.com/watch?v=xyz',
                loops: [
                    { name: 'Solo', start: 10, end: 30 }
                ]
            };
            
            removeLoop(loopData, 0);
            expect(loopData.loops).toHaveLength(1);
        });
    });

    describe('initializeLoopData', () => {
        it('should initialize with URL', () => {
            const result = initializeLoopData('https://youtube.com/watch?v=xyz');
            expect(result).toEqual({
                url: 'https://youtube.com/watch?v=xyz',
                loops: []
            });
        });

        it('should initialize with empty URL', () => {
            const result = initializeLoopData('');
            expect(result).toEqual({
                url: '',
                loops: []
            });
        });

        it('should initialize with null', () => {
            const result = initializeLoopData(null);
            expect(result).toEqual({
                url: '',
                loops: []
            });
        });
    });
});
