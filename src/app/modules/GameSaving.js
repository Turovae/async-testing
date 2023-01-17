export default class GameSaving {
  constructor(json) {
    const data = JSON.parse(json);
    this.id = data.id;
    this.created = data.created;
    this.userInfo = data.userInfo;
  }
}
