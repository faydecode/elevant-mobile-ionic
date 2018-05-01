//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite'
import 'rxjs/add/operator/map';
import { Item } from 'ionic-angular';

/*
  Generated class for the GlobaldataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobaldataProvider {
  public pdb;
  _user: any;
  public cart;

  constructor() {
    console.log('Hello GlobaldataProvider Provider');
  }

  initDB()
  {
    //PouchDB.plugin(cordovaSqlitePlugin);
    this.pdb = new PouchDB('cart.db');
    //this.pdb.destroy();
  }

  addCart(id_produk,nama_produk,ukuran,img_url,jumlah)
  {
    var timeStamp = new Date().toISOString(),
        items = {
          _id : id_produk,
          nama_produk : nama_produk,
          ukuran : ukuran,
          img_url : img_url,
          jumlah : jumlah
        };

    return new Promise(resolve =>{
      this.pdb.put(items).catch((err)=>{
        resolve(false);
      });
      console.log(items);
      resolve(true);
    });
  }

  updateCart(id_produk,nama_produk,ukuran,img_url,jumlah,revisi)
  {

    var  comic    = {
             _id       : id_produk,
             _rev        : revisi,
             nama_produk : nama_produk,
             ukuran   : ukuran,
             img_url      : img_url,
             jumlah        : jumlah,

          };


    return new Promise(resolve =>{
      this.pdb.put(comic).catch((err)=>{
        resolve(false);
      });
      console.log('data terupdate',comic);
      resolve(true);
    });
  }

  deleteCart(items)
  {
    return new Promise(resolve =>{
      this.pdb.delete(items).catch((err)=>{
        resolve(false);
      });
      console.log(items);
      resolve(true);
    });
  }

  getProduk(id)
  {

    return new Promise(resolve =>{
      this.pdb.get(id).then((doc)=>{
          var item    = [];
          item.push(
            {
              id_produk            :  id,
              rev           :  doc._rev,
              nama_produk     :  doc.nama_produk,
              ukuran       :  doc.ukuran,
              img_url          :  doc.img_url,
              jumlah      :  doc.jumlah
            });
            
          resolve(item);
      }).catch((err)=>{
        resolve(false);
      });
    });
  }

  getCountItem()
  {
    return new Promise(resolve =>
    {
        this.pdb.allDocs({include_docs: true, descending: true, attachments: true}, function(err, doc)
        {
          let row   = doc.rows;
          resolve(row.length);
        });

    });
  }

  showCart() {  
    return new Promise(resolve =>
      {
         this.pdb.allDocs({include_docs: true, descending: true, attachments: true}, function(err, doc)
    {
        let k,
            items   = [],
            row   = doc.rows;

        for(k in row)
        {
          var item            = row[k].doc;    

          items.push(
          {
              id_produk      :   item._id,
              rev     :   item._rev,
              nama_produk     : item.nama_produk,
              ukuran      : item.ukuran,
              img_url : item.img_url,
              jumlah    : item.jumlah
          });
        }
              resolve(items);
              console.log('query item: ',items);
          });
          
        });
        
  }

}
