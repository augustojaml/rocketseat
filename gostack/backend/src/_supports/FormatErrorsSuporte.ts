/* eslint-disable @typescript-eslint/no-explicit-any */
interface IErrors {
  [key: string]: string;
}

const FormatErrorsSuporte = {
  format(error: any) {
    return error.inner.reduce((acc: IErrors, attr: IErrors) => {
      acc[attr.path] = attr.message;
      return acc;
    }, {});
  },
};

export { FormatErrorsSuporte };
