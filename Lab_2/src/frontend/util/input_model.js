import { x, y, r, table, count } from "../store.js";
import { get } from "svelte/store";
import { RequestHandler } from "./request_handler.js";
import { HitResult } from "./hit_result.js";

export class InputModel{
  constructor(){}

  requestData( vector, callback ){
    const request_map = new Map();
    request_map.set('x', vector.x);
    request_map.set('y', vector.y);
    request_map.set('r', get(r));
    this.setRows( RequestHandler.getData( request_map ), callback );
  }

  get_table_without_request( callback ){
    this.setRows( RequestHandler.get_table_without_request(), callback );
  }

  setRows( promise, callback ) {
    promise.then(( jsonData ) => {
      jsonData.forEach( item => {
        const hitResult = new HitResult(item["x"], item["y"], item["r"], item["hit"], item["currentTime"], item["execTime"]);
        const table_cur = get( table );
        table_cur.push( hitResult );
        table.set( table_cur );
      });
    }).then(() => {
      callback( get(table) );
    });
  }

  resetData(){
    RequestHandler.resetData();
    table.set([]);
    count.set(0);
  }


  get x (){
    return get(x);
  }

  get y (){
    return get(y);
  }

  get r (){
    return get(r);
  }

  set r ( value ){
    r.set( value );
  }

  get table (){
    return get(table);
  }

  set table ( value ){
    table.set( value );
  }
}
