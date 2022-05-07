"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

export default class ProductService {

    constructor() {
        this._products = DatabaseFactory.database.collection("products");
    }

    //Alle Produkte auslesen.
    async readAll(query) {
        let cursor = this._products.find(query, {});

        return cursor.toArray();
    }

    //Neues Produkt hinzufügen
    async create(product) {
        product = product || {};

        let newProduct = {
            number:         product.number || "",
            name:           product.name || "",
            picture_url:    product.picture_url || "",
            like:           product.like || "",
            dislike:        product.dislike || "",
            description:    product.description || ""
        };

        let result = await this._products.insertOne(newProduct);

        return await this._products.findOne({_id: result.insertedId});
    }


    //Bestimmtes Produkt auslesen
    async read(id) {
        let result = await this._products.findOne({_id: new ObjectId(id)});

        return result;
        
    }

    //Bearbeiten eines bestimmten Produkts
    async update(id, product) {
        let antiqueProduct = await this._products.findOne({_id: new ObjectId(id)});

        if(!antiqueProduct) return;

        let advancedProduct = { $set: {} }

        if (product.number) advancedProduct.$set.number = product.number;
        if (product.name) advancedProduct.$set.name = product.name;
        if (product.picture_url) advancedProduct.$set.picture_url = product.picture_url;
        if (product.like) advancedProduct.$set.like = product.like;
        if (product.dislike) advancedProduct.$set.dislike = product.dislike;
        if (product.description) advancedProduct.$set.description = product.description;

        await this._products.updateOne({_id: new ObjectId(id)}, advancedProduct);
        return this._products.findOne({_id: new ObjectId(id)});
    }

    //Löschen eines bestimmten Produktes
    async delete(id) {
        let result = await this._products.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}
