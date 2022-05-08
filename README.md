Grundgerüst: SPA mit REST-Backend
=================================

Inhaltsverzeichnis
------------------

 1. [Kurzbeschreibung](#kurzbeschreibung)
 2. [Schnittstellenbeschreibung](#schnittstellenbeschreibung)
 
Kurzbeschreibung
----------------

Das Ziel unserer App ist es, unterschiedliche Produkte bewerten zu können. Bei den Produkten handelt es sich um die Artikel der Firma Em-eukal. Das Ziel der App ist es, die unterschiedlichen Produkte durch ein Like oder Dislike zu bewerten und optional einen Kommentar abzugeben. Dabei besteht die App aus 2 wesentlichen Screens: der Produktübersichtsseite und der Detailseite. Auf der Produktübersichtsseite werden die unterschiedlichen Produkte untereinander mit dem Titel und einem Foto dargestellt. Durch das Klicken auf das Produkt gelangt man auf die jeweilige Detailseite dieses Produktes. Hier ist nochmal der Titel und das Foto zu sehen. Des Weiteren gibt es hier zusätzlich nähere Informationen zu diesem Produkt. Hier hat der Benutzer die Möglichkeit diesem Produkt ein Like/Dislike zu geben. Zusätzlich kann hier optional ein Kommentar zu diesem Produkt abgeben werden. Die Kommentare der weiteren Benutzer werden ebenfalls angezeigt. 

Schnittstellenbeschreibung
--------------------------

Unsere Schnittstellen sind toll. Ende. KISS.

/products
    - GET: Liefert alle Produkte
    - POST: Legt neuen Produkteintrag an

/reviews
    - GET: Liefert alle Produktbewertungen
    - POST: Legt neue Produktbewertung zu einem bestimmten Produkt an

/products/id
    - GET: Liefert bestimmten Produkteintrag
    - PUT/PATCH: Bearbeitet bestimmten Produkteintrag
    - DELETE: Löscht bestimmten Produkteintrag

/reviews/id 
    - GET: Liefert bestimmte Produktbewertung
    - PUT/PATCH: Bearbeitet bestimmte Produktbewertung
    - DELETE: Löscht bestimmte Produktbewertung

/productReviews/productNumber
    - GET: Liefert alle Bewertungen zu einem bestimmten Produkt