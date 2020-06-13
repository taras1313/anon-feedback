import { ApiAdapter } from '../api.adapter';
import axios from 'axios';

const adapterInstance = new ApiAdapter();
const methods = ['get', 'post', 'put', 'patch'];
const testResult = 'testResult';

describe('api adapter', () => {
	axios.get = jest.fn().mockImplementationOnce(() => Promise.resolve(testResult));
	axios.put = jest.fn().mockImplementationOnce(() => Promise.resolve(testResult));
	axios.post = jest.fn().mockImplementationOnce(() => Promise.resolve(testResult));
	axios.patch = jest.fn().mockImplementationOnce(() => Promise.resolve(testResult));

	test('methods', () => {
		methods.forEach(method => {
			expect(adapterInstance[method]()).resolves.toEqual(testResult);
		});
	});
});
