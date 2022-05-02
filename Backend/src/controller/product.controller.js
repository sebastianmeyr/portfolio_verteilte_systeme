import {wrapHandler} from "../utils.js";

export default class ProductController {
    constructor(server, prefix) {
        this._service = new ProductService();
        this._prefix = prefix;

        //Collection
        server.get(prefix, wrapHandler(this, this.readAll));
        server.post(prefix, wrapHandler(this, this.create));

        //Entity
        server.get(prefix + "/:id", wrapHandler(this, this.read));
        server.put(prefix + "/:id", wrapHandler(this, this.put));
        server.patch(prefix + "/:id", wrapHandler(this, this.patch));
        server.del(prefix + "/:id", wrapHandler(this, this.delete));
    }

    //GET /products
    async readAll(req, res, next) {
        let result = await this._service.readAll(req.query);
        res.sendResult(result);

        return next();
    }

    //POST /products
    async create(req, res, next) {
        let result = await this._service.create(req.body);

        res.status(201);
        // TODO: ???
        //res.header("Location", `${this._prefix}/${result._id}`);
        res.sendResult(result);

        return next();
    }

    //GET /products/:id
    async read(req, res, next) {
        let result = await this._service.read(req.params.id);

        if (result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Produkt nicht gefunden.");
        }

        return next();
    }

    //PUT /products/:id
    async put(req, res, next) {
        let result = await this._service.update(req.params.id, req.body);

        if(result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Produkt nicht gefunden");
        }

        return next();
    }

    //PATCH /products/:id
    async patch(req, res, next) {
        let result = await this._service.update(req.params.id, req.body);

        if(result) {
            res.sendResult(result);
        } else {
            throw new RestifyError.NotFoundError("Produkt nicht gefunden");
        }

        return next();
    }


    //DELETE /products/:id
    async delete(req, res, next) {
        await this._service.delete(req.params.id)
        res.status(404);
        res.sendResult({});
        return next();
    }
}