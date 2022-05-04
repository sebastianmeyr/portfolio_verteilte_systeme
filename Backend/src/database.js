"use strict"

import { MongoClient } from "mongodb";

/**
 * Singleton-Klasse zum Zugriff auf das MongoDB-Datenbankobjekt, ohne dieses
 * ständig als Methodenparameter durchreichen zu müssen. Stattdessen kann
 * einfach das Singleton-Objekt dieser Klasse importiert und das Attribut
 * `mongodb` oder `database` ausgelesen werden.
 */
class DatabaseFactory {
    /**
     * Ersatz für den Konstruktor, damit aus dem Hauptprogramm heraus die
     * Verbindungs-URL der MongoDB übergeben werden kann. Hier wird dann
     * auch gleich die Verbindung hergestellt.
     *
     * @param {String} connectionUrl URL-String mit den Verbindungsdaten
     */
    async init(connectionUrl) {
        // Datenbankverbindung herstellen
        this.client = new MongoClient(connectionUrl);
        await this.client.connect();
        this.database = this.client.db("app_database");

        await this._createDemoData();
    }

    /**
     * Hilfsmethode zum Anlagen von Demodaten. Würde man so in einer
     * Produktivanwendung natürlich nicht machen, aber so sehen wir
     * wenigstens gleich ein paar Daten.
     */
    async _createDemoData() {
        //// TODO: Methode anpassen, um zur eigenen App passende Demodaten anzulegen ////
        //// oder die Methode ggf. einfach löschen und ihren Aufruf oben entfernen.  ////
        let demoProducts = this.database.collection("products");
        let demoReviews = this.database.collection("reviews");

        if (await demoProducts.estimatedDocumentCount() === 0) {
            demoProducts.insertMany([
                {
                    number: 12345,
                    name: "Em-eukal Klassisch",
                    picture_url: "https://www.em-eukal.com/wp-content/uploads/sites/2/2400_EE_Klassisch_zh_150g__2020.png",
                    like: 125,
                    dislike: 3,
                    description: "Unser Klassiker ist berühmt für seine starke Kombination aus Eukalyptusöl und Menthol. Und sorgt so immer und überall für einen besonderen Geschmack, der Wirkung zeigt. Nach dem Originalrezept von Dr. Carl Soldan aus dem Jahr 1923.",
                },
                {
                    number: 12346,
                    name: "Em-eukal Zitrone",
                    picture_url: "https://www.em-eukal.com/wp-content/uploads/sites/2/2420_EE_Zitrone_zfr_75g__2020.png",
                    like: 21,
                    dislike: 75,
                    description: "Das spritzige Premiumbonbon mit einer angenehmen Zitronennote, feinen Extrakten aus der Zitronenmelisse und kühlendem Menthol. Für ein herrlich erfrischendes, fruchtiges Geschmackserlebnis.",
                },
                {
                    number: 12347,
                    name: "Em-eukal Waldkirsche",
                    picture_url: "https://www.em-eukal.com/wp-content/uploads/sites/2/2415_EE_Wildkirsche_zfr_75g__2020.png",
                    like: 93,
                    dislike: 7,
                    description: "In diesem Premiumbonbon treffen sich hochwertige, natürliche Zutaten. Es vereint den Geschmack von fruchtigen Wildkirschen mit kühlendem Menthol. Und das zeigt Wirkung. Immer und überall!",
                },
                {
                    number: 12348,
                    name: "Em-eukal Johannisbeere",
                    picture_url: "https://www.em-eukal.com/wp-content/uploads/sites/2/2430_EE_Johannisbeere_zfr_75g__2020.png",
                    like: 42,
                    dislike: 12,
                    description: "Erfrischung pur: Dieses Premiumbonbon mit dem Geschmack von Schwarzer Johannisbeere schmeckt fruchtig-frisch und überrascht den Gaumen. Das Tüpfelchen auf dem i? Seine köstliche Füllung.",
                },
                {
                    number: 12349,
                    name: "Em-eukal Salbei",
                    picture_url: "https://www.em-eukal.com/wp-content/uploads/sites/2/2450_EE_Salbei_zh_75g__2020.png",
                    like: 12,
                    dislike: 5,
                    description: "Aromatisch und kräuterig-frisch umschmeichelt das Salbeibonbon den Gaumen. Jedes einzelne dieser Premiumbonbons enthält feinen Salbeiextrakt und hochwertige ätherische Öle. Lecker wirkt immer!",
                },
                {
                    number: 12350,
                    name: "Em-eukal Honig",
                    picture_url: "https://www.em-eukal.com/wp-content/uploads/sites/2/2445_EE_Honig_gefuellt_zh_75g__2020.png",
                    like: 2,
                    dislike: 89,
                    description: "Eine Komposition der Extraklasse: Dieses Premiumbonbon enthält sanften Yucatan-Honig. Und sorgt angenehm mild für einen ganz besonderen Geschmack, der seine Wirkung zeigt.",
                },
                {
                    number: 12351,
                    name: "Em-eukal Anis-Fenchel",
                    picture_url: "https://www.em-eukal.com/wp-content/uploads/sites/2/2455_EE_Anis-Fenchel_zfr_75g__2020.png",
                    like: 9,
                    dislike: 37,
                    description: "Eine traditionelle Bonbonspezialität – mit ätherischen Ölen und feinem Anis- und Fenchelextrakt. Die sorgsam ausgewählten Ingredienzien sorgen für einen kräutersanften Geschmack, der seine Wirkung zeigt.",
                },
                {
                    number: 12352,
                    name: "Em-eukal Milde Minze",
                    picture_url: "https://www.em-eukal.com/wp-content/uploads/sites/2/2437_EE_MildeMinze_zfr_75g__2020.png",
                    like: 98,
                    dislike: 7,
                    description: "Dieses Premiumbonbon verspricht Extra-Genuss: Ätherische Öle aus der Mitcham-Minze verwöhnen angenehm mild. Und zusammen mit hochwertigen, natürlichen Zutaten entsteht ein intensiv-erfrischendes Gaumenaroma.",
                },
            ]);
        }

        if (await demoReviews.estimatedDocumentCount() === 0) {
            demoReviews.insertMany([
                {
                    product_number: 12345,
                    name: "Ursula123",
                    comment: "Hallo liebe Em-eukal Liebhaber!!! Das klassische Em-eukal ist einfach das beste! <3 Ich habe es vergangenen Mittwoch meinem lieben Enkel Ferdinand gekauft. Sehr erfreut war der Bub!! <3 Ich trage seit dem immer mindestens eine Packung Em-eukal-Klassisch in meiner selbstgestrickten Handtasche!! Liebste Grüße aus der Südpfalz, eure Ursula und Manfred.",
                    like: true
                },
                {
                    product_number: 12345,
                    name: "asdasd",
                    comment: "asdasd",
                    like: true
                },
                {
                    product_number: 12345,
                    name: "haksdhja",
                    comment: "haksdhjlkal",
                    like: true
                },
                {
                    product_number: 12345,
                    name: "lkajlsjdl",
                    comment: "alksdl",
                    like: true
                },
            ])
        }
    }
}

export default new DatabaseFactory();
