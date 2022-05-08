"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

export default class ReviewService {

    constructor() {
        this._reviews = DatabaseFactory.database.collection("reviews");
    }

    //Alle Produktebewertungen auslesen
    async readAll(query) {
        let cursor = this._reviews.find(query, {});

        return cursor.toArray();
    }

    //Neue Produktbewertung hinzufügen
    async create(review) {
        review = review || {};

        let newReview = {
            product_number: review.product_number || "",
            name:           review.name           || "",
            comment:        review.comment        || "",
            like:           review.like           || "",
        };

        let result = await this._reviews.insertOne(newReview);

        return await this._reviews.findOne({_id: result.insertedId});
    }


    //Bestimmte Produktbewertung auslesen
    async read(id) {
        let result = await this._reviews.findOne({_id: new ObjectId(id)});

        return result;
    }

    //Bearbeiten einer bestimmten Produktbewertung
    async update(id, review) {
        let antiqueReview = await this._reviews.findOne({_id: new ObjectId(id)});

        if(!antiqueReview) return;

        let advancedReview = { $set: {} }

        if (review.product_number) advancedReview.$set.product_number = review.product_number;
        if (review.name) advancedReview.$set.name = review.name;
        if (review.comment) advancedReview.$set.comment = review.comment;
        if (review.like) advancedReview.$set.like = review.like;

        await this._reviews.updateOne({_id: new ObjectId(id)}, advancedReview);
        return this._reviews.findOne({_id: new ObjectId(id)});
    }

    //Löschen einer bestimmten Produktbewertung
    async delete(id) {
        let result = await this._reviews.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}
