declare namespace jest {
  interface Matchers<R> {
    toMatchHostname: (filter: any, hostname: any) => object;
    toMatchRequest: (filter: any, request: any) => object;
  }

  interface Expect {
    toMatchHostname: (filter: any, hostname: any) => object;
    toMatchRequest: (filter: any, request: any) => object;
  }
}
