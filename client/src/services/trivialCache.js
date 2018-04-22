class TrivialCache {

  constructor(size) {
    this._size = size || 10;
    this._cache = new Map();
    this._buffer = [];
  }

  set(key, value) {
    this._manageSize();
    this._cache.set(key, value);
    this._buffer.push(key);
    return value;
  }

  _manageSize() {
    while (this._buffer.length >= this._size) {
      const key = this._buffer.unshift();
      this._cache.delete(key);
    }
  }

  get(key) {
    return this._cache.get(key);
  }
}

export default TrivialCache;