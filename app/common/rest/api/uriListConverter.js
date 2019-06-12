export default {
  read(str) {
    return str.split('\n');
  },
  write(obj) {
    if (obj instanceof Array) {
      return obj.map(resource => resource._links.self.href).join('\n');
    }

    return obj._links.self.href;
  },
};
