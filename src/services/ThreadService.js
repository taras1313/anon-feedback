import { pathList } from './constants';

export class ThreadService {
	constructor(adapter) {
		this._adapter = adapter;
		this._baseUrl = pathList.thread.base;
		this._likeUrl = pathList.thread.like;
		this._dislikeUrl = pathList.thread.dislike;
	}

	getThreads = params => {
		return this._adapter.get(this._baseUrl, params).then(({ data }) => data);
	};
	getThread = id => {
		return this._adapter.get(`${this._baseUrl}/${id}`).then(({ data }) => data);
	};

	getSubscribed = subscribedThreadsIds => {
		return this._adapter.get(`${this._baseUrl}/subscribed`, { subscribedThreadsIds }).then(({ data }) => data);
	};

	getLiked = userId => {
		return this._adapter.get(`${this._baseUrl}/liked`, { userId }).then(({ data }) => data);
	};

	getReplied = threadsIds => {
		console.log()
		return this._adapter.get(`${this._baseUrl}/replied`, { threadsIds }).then(({ data }) => data);
	};

	getCreated = createdThreadsIds => {
		return this._adapter.get(`${this._baseUrl}/created`, { createdThreadsIds }).then(({ data }) => data);
	};

	createThread = thread => {
		return this._adapter.post(`${this._baseUrl}/create`, thread).then(({ data }) => data);
	};

	updateThread = thread => {
		return this._adapter.patch(`${this._baseUrl}/update`, thread).then(({ data }) => data);
	};

	subscribeToThread = params => {
		return this._adapter.patch(`${this._baseUrl}/subscribe`, params).then(({ data }) => data);
	};

	unsubscribeFromThread = params => {
		return this._adapter.patch(`${this._baseUrl}/unsubscribe`, params).then(({ data }) => data);
	};

	createComment = params => {
		return this._adapter.patch(`${this._baseUrl}/create-comment`, params).then(({ data }) => data);
	};

	updateComment = params => {
		return this._adapter.patch(`${this._baseUrl}/update-comment`, params).then(({ data }) => data);
	};

	like = ({ id, userId }) => {
		return this._adapter.patch(`${this._likeUrl}`, { id, userId }).then(({ data }) => data);
	};

	dislike = ({ id, userId }) => {
		return this._adapter.patch(`${this._dislikeUrl}`, { id, userId }).then(({ data }) => data);
	};

	likeComment = ({ id, userId, commentId }) => {
		return this._adapter.patch(`${this._baseUrl}/like-comment`, { id, userId, commentId }).then(({ data }) => data);
	};

	dislikeComment = ({ id, userId, commentId }) => {
		return this._adapter.patch(`${this._baseUrl}/dislike-comment`, { id, userId, commentId }).then(({ data }) => data);
	};
}
