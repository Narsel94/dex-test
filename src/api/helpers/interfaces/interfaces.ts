export interface IRequestBaseBody<RequestGenericType>  {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: RequestGenericType 
}