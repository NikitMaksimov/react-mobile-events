const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');

class DB {
    constructor({ NAME }) {
        this.db = new sqlite3.Database(path.join(__dirname, NAME));
    }

    destructor() {
        if (this.db) this.db.close();
    }

    getEventNameByName(name) { //Это максимально полезный запрос
        return new Promise(resolve =>
            this.db.serialize(() => {
                const query = "SELECT event_name FROM events WHERE event_name=?";
                this.db.get(query, [name], (err, row) => resolve(err ? null : row));
            })
        );
    }

}

module.exports = DB;