//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
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
    PouchDB.plugin(PouchDBFind);
    this.pdb = new PouchDB('cart.db');
    //this.pdb.destroy();
  }

  addCart(id_produk,nama_produk,ukuran,img_url,jumlah,harga)
  {
    var timeStamp = new Date().toISOString(),
        items = {
          _id : timeStamp,
          id_produk : id_produk,
          nama_produk : nama_produk,
          ukuran : ukuran,
          img_url : img_url,
          jumlah : jumlah,
          harga : harga
        };

    return new Promise(resolve =>{
      this.pdb.put(items).catch((err)=>{
        resolve(false);
      });
      console.log(items);
      resolve(true);
    });
  }

  updateCart(id,id_produk,nama_produk,ukuran,img_url,jumlah,harga,revisi)
  {

    var  comic    = {
             _id       : id,
             id_produk : id_produk,
             _rev        : revisi,
             nama_produk : nama_produk,
             ukuran   : ukuran,
             img_url      : img_url,
             jumlah        : jumlah,
            harga : harga
          };


    return new Promise(resolve =>{
      this.pdb.put(comic).catch((err)=>{
        resolve(false);
      });
      console.log('data terupdate',comic);
      resolve(true);
    });
  }

  deleteCart(id,rev)
  {
    return new Promise(resolve =>{
      var item = { _id:id, _rev:rev }
      this.pdb.remove(item).catch((err)=>{
        resolve(false);
      });
      //console.log(items);
      resolve(true);
    });
  }

  getProduk(id,ukuran)
  {

    /*return new Promise(resolve =>{
      this.pdb.get(id).then((doc)=>{
          var item    = [];
          item.push(
            {
              _id          : id,
              id_produk   :  doc.id_produk,
              rev         :  doc._rev,
              nama_produk :  doc.nama_produk,
              ukuran      :  doc.ukuran,
              img_url     :  doc.img_url,
              jumlah      :  doc.jumlah
            });
            
          resolve(item);
      }).catch((err)=>{
        resolve(false);
      });
    });
    */
   return new Promise(resolve =>{
    let k;
    let items = [];

    this.pdb.find({
        selector: {
          id_produk: id,
          ukuran:ukuran
        },
        fields: ['_id', 'id_produk','nama_produk','img_url','ukuran','harga','jumlah','_rev']
      }).then(function (result) {
        // handle result
        console.log(result);
        let row = result.docs;
        if(row.length > 0)
        {
          for(k in row)
          {
            var item = row[k];
            
            items.push(
            {
              id : item._id,
              id_produk : item.id_produk,
              nama_produk : item.nama_produk,
              img_url : item.img_url,
              ukuran : item.ukuran,
              harga : item.harga,
              jumlah : item.jumlah,
              rev : item._rev
            });
          }
          resolve(items);
        } else {
          resolve(false);
        }
      }).catch(function (err) {
        console.log(err);
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
              id  : item._id,
              id_produk      :   item.id_produk,
              rev     :   item._rev,
              nama_produk     : item.nama_produk,
              ukuran      : item.ukuran,
              img_url : item.img_url,
              jumlah    : item.jumlah,
              harga : item.harga
          });
        }
              resolve(items);
              console.log('query item: ',items);
          });
          
        });
        
  }

}
