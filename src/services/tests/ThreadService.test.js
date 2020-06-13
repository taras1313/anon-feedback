import { ThreadService } from '../ThreadService';

const testResult = 'testResult';

const adapter = {
	get: jest.fn().mockImplementation(() => Promise.resolve({ data: testResult })),
	post: jest.fn().mockImplementation(() => Promise.resolve({ data: testResult })),
	patch: jest.fn().mockImplementation(() => Promise.resolve({ data: testResult }))
};

const serviceInstance = new ThreadService(adapter);

describe('ThreadService', () => {
	test(`methods`, () => {
		for (let field in serviceInstance) {
			if (!field.includes('_')) {
				expect(serviceInstance[field]({ id: 'id', userId: 'user', commentId: 'idi' })).resolves.toEqual(
					testResult
				);
			}
		}
	});
});
