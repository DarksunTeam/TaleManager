class Campaign {
    constructor(_id, name, protagonists, description, date, setIn, fileName) {
        this._id = _id
        this.name = name
        this.protagonists = protagonists
        this.description = description
        this.date = date
        this.setIn = setIn
        this.fileName = fileName
    }

    set(property, value) {
        this[property] = value;
    }

    convertToCard() {
        return { _id: this._id, title: this.name, subtitles: this.protagonists, description: this.description }
    }
}

export default Campaign;