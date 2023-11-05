export interface IRequestBaseBody<RequestGenericType = string>  {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: RequestGenericType 
}