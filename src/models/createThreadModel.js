export class CreateThreadModel {
  constructor({ title, text, authorId, username }) {
    this.title = title;
    this.text = text;
    this.users = [{ userId: authorId, username }];
    this.author = { userId: authorId, username };
    this.subscribers = [{ userId: authorId }];
  }
}