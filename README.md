# 📚 Database biblioteca

- [Setup](#-setup)
- [Struttura db](#️-struttura-del-database)
- [Esempi](#-esempi-di-struttura)
- [Popolamento](#-popolamento)


## 🛠️ Setup

Questo progetto utilizza **MongoDB** tramite **Docker**. 
Assicurati che Docker sia installato sul tuo computer prima di procedere.

### 🔧 Requisiti

- Docker
- Docker Compose

### 💻 Istruzioni per l'installazione

1. Installa Docker

    Se non lo hai già fatto, installa [Docker Desktop](https://www.docker.com/get-started/) seguendo la guida ufficiale per il 
    tuo sistema operativo.

2. Clona il repository

    Scarica il progetto sul tuo computer. Da terminale:

    ```bash
    git clone https://github.com/Spicysimonroll/DatabaseBiblioteca.git
    cd DatabaseBiblioteca
    ```

3. Avvia i containers

    Sempre dal terminale, nella cartella del progetto:

    ```bash
    docker-compose up
    ```

    > 📝 Questo comando avvia tutti i container necessari, incluso MongoDB.

4. Verifica che i containers siano attivi

    Per controllare che i containers siano stati avviati correttamente, esegui:

    ```bash
    docker ps
    ```

    Dovresti vedere una lista con i container attivi, tra cui MongoDB e la GUI.

    Esempio di riferimento: 

    ```bash
    docker ps

    CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS          PORTS                      NAMES
    4dc281cc0d98   dbgate/dbgate   "docker-entrypoint.s…"   2 seconds ago   Up 2 seconds   0.0.0.0:3000->3000/tcp       dbgate
    0d4931fffbd0   mongo           "docker-entrypoint.s…"   2 seconds ago   Up 2 seconds   0.0.0.0:27017->27017/tcp     database
    ```

5. Accesso all'interfaccia grafica (GUI)

    Una volta che i container sono attivi, puoi accedere all’interfaccia grafica tramite:

    ```bash
    http://localhost:3000
    ```

    > ❗ Il database `library_example` non sarà visibile in DbGate finché non contiene almeno una collezione con dati.
    > Per renderlo visibile, esegui lo script `seed.js` o crea un documento manualmente.


## 🗃️ Struttura del database

Il database è strutturato in collezioni, comparabili a tabelle. In particolare avrà le seguenti collezioni:

- `authors`
- `books`
- `users`
- `loans`

### 🔗 Strategia di modellazione

Si utilizza una strategia basata su riferimenti (**reference-based**), perché i dati presentano relazioni **molti-a-molti 
(N:N)**:

| Relazione        | Descrizione                                                                                          |
|------------------|------------------------------------------------------------------------------------------------------|
| Autore ↔ Libro   | Un autore può scrivere più libri e un libro può avere più autori                                     |
| Utente ↔ Libro   | Un utente può prendere in prestito più libri e ogni libro può essere prestato a più utenti nel tempo |

### ❌ Perché non usare embedded documents?

L’approccio embedded, seppur utile in alcuni contesti, in questo caso porta a:

- 📍 Esempio 1: Embedding autori in un libro

    ```js
    {
        title: "The Vanishing Signal",
        authors: [
            { name: "Raj Malhotra", birthYear: 1982, ... }
        ]
    }
    ```

    Problema:

    Se l'autore cambia nome o nazionalità, andrebbero aggiornati tutti i documenti book in cui è inserito.

- 📍 Esempio 2: Embedding libri in un autore

    ```js
    {
        name: "Raj Malhotra",
        books: [
            { title: "The Vanishing Signal", yearPublished: 2015, ... }
        ]
    }
    ```

    Problema:

    - Duplichi i dati del libro.
    - Gestire più autori per lo stesso libro diventa complicato.

### ✅ Perché scegliere i riferimenti in questo caso

| Vantaggio              | Descrizione                                             |
|------------------------|---------------------------------------------------------|
| Relazioni N:N          | Modellazione pulita e scalabile                         |
| Aggiornamenti semplici | Ogni documento è modificabile in modo indipendente      |
| Query flessibili       | Puoi filtrare e aggregare tra collezioni                |
| Scalabilità            | Nessuna duplicazione e documenti più leggeri            |

### ✅ Quando usare embedded invece?

Usa l’embedding solo quando:

- Il contenuto è **strettamente legato** al documento principale.
- La relazione è **uno-a-pochi**.
- Non ti serve accedere agli elementi embedded in **modo indipendente**.

Esempio: i `recapiti` o `recensioni` di un libro se sono pochi e usati solo insieme al libro.


## 📄 Esempi di struttura

Per esempi concreti dei documenti utilizzati nel database, consultare la cartella `json`. 

In essa troverai esempi per:

- `autore.json`
- `libro.json`
- `utente.json`
- `prestito.json`


## 🌱 Popolamento

Per popolare il database con i dati di esempio:

1. Assicurati che il container di MongoDB sia in esecuzione:

    ```bash
    docker ps
    ```

2. Se il container non è attivo, avvialo:

    ```bash
    docker start database 
    ```

    > `database` è il nome del container

3. Popola il database eseguendo lo script `seed.js`:

    ```bash
    docker exec -i database mongosh biblioteca < ./seed.js
    ```

    > 📂 Assicurati che il file seed.js si trovi nella cartella radice del progetto oppure modifica il path nel comando in 
    >    base alla sua posizione.

4. Apri DBGate su `http://localhost:3000` e premi **Refresh**: il database `library_example` ora sarà visibile con le 
   collezioni popolate.