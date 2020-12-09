class Character {
    constructor(_id, name, race, family, sex, fisicalCaracteristics, background, interpretationTips, bornDate, dieDate) {
        this._id = _id
        this.name = name
        this.race = race
        this.family = family
        this.sex = sex
        this.fisicalCaracteristics = fisicalCaracteristics
        this.background = background
        this.interpretationTips = interpretationTips
        this.bornDate = bornDate
        this.dieDate = dieDate
    }

    set(property, value) {
        this[property] = value;
    }

    convertToCard() {
        return { _id: this._id, title: this.name, subtitles: [this.race, this.sex], description: this.interpretationTips }
    }
}

export default Character;