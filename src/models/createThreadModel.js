export class CreateThreadModel {
  constructor({ title, text, authorId, username }) {
    this.title = title;
    this.text = text;
    this.authorId = authorId;
    this.users = [{ userId: authorId, username }];
    this.authorId = authorId;
    this.subscribers = [{ userId: authorId }];
  }
}