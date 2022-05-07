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

              

        /*this._emptyMessageElement = this._mainElement.querySelector(".empty-placeholder");

        if (data.length) {
            this._emptyMessageElement.classList.add("hidden");
        }*/

        // Je Datensatz einen Li der Produktbewertungensteneintrag generieren
        /*let olElement = this._mainElement.querySelector("ol");

        let templateElement = this._mainElement.querySelector(".list-entry");
        let templateHtml = templateElement.outerHTML;
        templateElement.remove();

        for (let index in data) {
            // Platzhalter ersetzen
            let dataset = data[index];
            let html = templateHtml;

            html = html.replace("$ID$", dataset._id);
            html = html.replace("$NAME$", dataset.name);
            html = html.replace("$PICTURE_URL$", dataset.picture_url);
            html = html.replace("$LIKE$", dataset.like);
            html = html.replace("$DISLIKE$", dataset.dislike);

            // Element in die Liste einfügen
            let dummyElement = document.createElement("div");
            dummyElement.innerHTML = html;
            let liElement = dummyElement.firstElementChild;
            liElement.remove();
            olElement.appendChild(liElement);

            // Event Handler registrieren
            //liElement.querySelector(".action-click").addEventListener("click", () => location.hash = `#/${dataset._id}`);
        }*/

        //// TODO: Anzuzeigende Inhalte laden mit this._app.backend.fetch() ////
        //// TODO: Inhalte in die HTML-Struktur einarbeiten ////
        //// TODO: Neue Methoden für Event Handler anlegen und hier registrieren ////
    }
};