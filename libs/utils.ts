export default {
  empty: (mixedVar: any) => {
    let key: any;
    let i: number;
    const emptyValues = ['undefined', null, false, 0, '', '0', undefined];
    let len: number = emptyValues.length;
    for (i = 0; i < len; i++) {
      if (mixedVar === emptyValues[i]) {
        return true;
      }
    }
    if (typeof mixedVar === 'object') {
      for (key in mixedVar) {
        if (mixedVar.hasOwnProperty(key))
          return false;
      }
      return true;
    }
    return false;
  },
};
