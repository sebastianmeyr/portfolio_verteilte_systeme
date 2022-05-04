"use strict"

import {wrapHandler} from "../utils.js";
import ReviewService from "../service/review.service.js";

export default class Product_reviewController{

    constructor(server, prefix) {
        this._service = new ReviewService();
        this._prefix = prefix;

        server.get(prefix + "/:number", wrapHandler(this, this.read));
    }

    async read(req, res, next) {
        let result = await this._service.readAll(req.query);
        var advancedResult = [];

        result.map((review) => {
            if(review.product_number == req.params.number){
                advancedResult.push(result[i]);
            }
        })

        res.sendResult(advancedResult);

        return next();
    }
}