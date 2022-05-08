"use strict";

import Page from "../page.js";
import HtmlTemplate from "./page-list.html";


export default class PageList extends Page {

    //Konstruktor
    constructor(app) {
        super(app, HtmlTemplate);

        this._emptyMessageElement = null;
    }

    async init() {
        //HTML-Inhalt nachladen
        await super.init();
        this._title = "Übersicht";

        //Platzhalter anzeigen, wenn noch keine Daten vorhanden sind
        let data = await this._app.backend.fetch("GET", "/products");
        this._emptyMessageElement = this._mainElement.querySelector(".empty-placeholder");

        if (data.length) {
            this._emptyMessageElement.classList.add("hidden");
        }

        //Je Datensatz einen Listeneintrag generieren
        let olElement = this._mainElement.querySelector("ol");

        let templateElement = this._mainElement.querySelector(".list-entry");
        let templateHtml = templateElement.outerHTML;
        templateElement.remove();

        for (let index in data) {
            //Platzhalter ersetzen
            let dataset = data[index];
            let html = templateHtml;

            html = html.replace("$ID$", dataset._id);
            html = html.replace("$NAME$", dataset.name);
            html = html.replace("$PICTURE_URL$", dataset.picture_url);
            html = html.replace("$LIKE$", dataset.like);
            html = html.replace("$DISLIKE$", dataset.dislike);

            //Element in die Liste einfügen
            let dummyElement = document.createElement("div");
            dummyElement.innerHTML = html;
            let liElement = dummyElement.firstElementChild;
            liElement.remove();
            olElement.appendChild(liElement);

            //Event Handler erstellen
            liElement.querySelector(".action-click").addEventListener("click", () => location.hash = `#/${dataset._id}`);
        }
    }
};
