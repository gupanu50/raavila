
export default (build: any,path:string) =>
  build.query({
    query: (data:any) => {
      console.log('api : ',path ,":", data,)
      return path
    },
  })