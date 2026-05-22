import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'stores.public_index': { paramsTuple?: []; params?: {} }
    'stores.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'products.index_public': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'orders.store': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'stores.index': { paramsTuple?: []; params?: {} }
    'stores.store': { paramsTuple?: []; params?: {} }
    'stores.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'stores.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.index': { paramsTuple?: []; params?: {} }
    'products.store': { paramsTuple?: []; params?: {} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.toggle_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'orders.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'orders.buyer_index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'stores.public_index': { paramsTuple?: []; params?: {} }
    'stores.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'products.index_public': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'stores.index': { paramsTuple?: []; params?: {} }
    'products.index': { paramsTuple?: []; params?: {} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'orders.buyer_index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'stores.public_index': { paramsTuple?: []; params?: {} }
    'stores.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'products.index_public': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'stores.index': { paramsTuple?: []; params?: {} }
    'products.index': { paramsTuple?: []; params?: {} }
    'orders.index': { paramsTuple?: []; params?: {} }
    'orders.buyer_index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'orders.store': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'stores.store': { paramsTuple?: []; params?: {} }
    'products.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'stores.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'orders.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'stores.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'products.toggle_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}