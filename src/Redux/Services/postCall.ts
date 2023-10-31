export default (build: any, path: string) =>
  build.mutation({
    query: (credentials: any) => {
      console.log('postData:' + path + ':', credentials);
      return {
        url: path,
        method: 'POST',
        body: credentials,
      };
    },
  });
