"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-details.html";

/**
 * Klasse PageList: Stellt die Listenübersicht zur Verfügung
 */
export default class PageDetails extends Page {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     */
    constructor(app, productId) {
        super(app, HtmlTemplate);

        this._productId = productId;

        this._emptyMessageElement = null;
    }

    async init() {
        // HTML-Inhalt nachladen
        await super.init();
        console.log(this._productId)

        // Platzhalter anzeigen, wenn noch keine Daten vorhanden sind
        if(this._productId) {
            this._dataset = await this._app.backend.fetch("GET", "/products/" + this._productId);
            this._title = this._dataset.name + " - Details";
        }

        let html = this.mainElement.innerHTML; 
        html = html.replace("$NAME$", this._dataset.name);
        html = html.replace("$LIKE$", this._dataset.like);
        html = html.replace("$DISLIKE$", this._dataset.dislike);
        html = html.replace("$DESCRIPTION$", this._dataset.description);
        html = html.replace("$PICTURE_URL$", this._dataset.picture_url);
        this._mainElement.innerHTML = html;

              
        let reviews = await this._app.backend.fetch("GET", "/productReviews/" + this._dataset.number);
        this._emptyMessageElement = this._mainElement.querySelector(".empty-placeholder");

        if (reviews.length) {
            this._emptyMessageElement.classList.add("hidden");
        }

        // Je Datensatz einen Li der Produktbewertungensteneintrag generieren
        let ulElement = this._mainElement.querySelector("ul");

        let templateElement = this._mainElement.querySelector(".list-entry");
        let templateHtml = templateElement.outerHTML;
        templateElement.remove();

        for (let index in reviews) {
            // Platzhalter ersetzen
            let review = reviews[index];
            let html = templateHtml;

            html = html.replace("$NAME$", review.name);

            let pictureUrl;
            if (review.like == "like")
                pictureUrl = "https://previews.123rf.com/images/mutlik/mutlik1808/mutlik180800021/112002464-cartoon-wie-daumen-hoch-im-comic-stil-vektor-illustration-.jpg";
            else
                pictureUrl = "https://previews.123rf.com/images/triken/triken1608/triken160800024/61320639-dislike-smileyemoticon-unterzeichnen-vektor-illustration-auf-wei%C3%9Fem-hintergrund-.jpg";

            html = html.replace("$PICTURE_URL$", pictureUrl);
            html = html.replace("$COMMENT$", review.comment);

            // Element in die Liste einfügen
            let dummyElement = document.createElement("div");
            dummyElement.innerHTML = html;
            let liElement = dummyElement.firstElementChild;
            liElement.remove();
            ulElement.appendChild(liElement);
        }

        let submitButton = this._mainElement.querySelector(".action-submit");
        submitButton.addEventListener("click", () => this._submitReview());

        let likeButton = this._mainElement.querySelector(".action-like");
        likeButton.addEventListener("click", () => this._updateLikes(true));

        let dislikeButton = this._mainElement.querySelector(".action-dislike");
        dislikeButton.addEventListener("click", () => this._updateLikes(false));

        this._nameInput = this._mainElement.querySelector("input.name");
        this._commentInput = this._mainElement.querySelector("input.comment");
        this._likeInput = this._mainElement.querySelector('input[name="rating"]:checked');
    }

    async _submitReview() {
        let newReview = {
            product_number: this._dataset.number,
            name: null,
            comment: null,
            like: true
        }

        newReview.name = this._nameInput.value.trim();
        newReview.comment = this._commentInput.value.trim();
        newReview.like = this._mainElement.querySelector('input[name="rating"]:checked').value;

        this._updateLikes(this._mainElement.querySelector('input[name="rating"]:checked').value == "like");

        if(!newReview.name) {
            alert("Gebe einen Namen ein! >:(");
            return;
        }

        if(!newReview.comment) {
            alert("Gebe eine Bewertung ein! >:(");
            return;
        }

        try {
            await this._app.backend.fetch("POST", "/reviews", {body: newReview});
        } catch (ex) {
            this._app.showException(ex);
            return;
        }

        window.location.reload();
    }

    async _updateLikes(likeQuestionmark) {
        if (likeQuestionmark)
            this._dataset.like++;
        else
            this._dataset.dislike++;

        try {
            await this._app.backend.fetch("PATCH", "/products/" + this._productId, {body: this._dataset});
        } catch (ex) {
            this._app.showException(ex);
            return;
        }

        window.location.reload();
    }
};