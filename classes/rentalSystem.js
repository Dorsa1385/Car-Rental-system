class RentalSystem {
    constructor() {
        this.autos = [];
    }

    autoToevoegen(auto) {
        this.autos.push(auto);
    }

    alleAutosWeergeven() {
        return this.autos;
    }

    autoHuren(id) {
        const auto = this.autos.find(a => a.id === id);
        if (auto && !auto.isVerhuurd) {
            auto.isVerhuurd = true;
            return true;
        }
        return false;
    }

    autoTerugbrengen(id) {
        const auto = this.autos.find(a => a.id === id);
        if (auto && auto.isVerhuurd) {
            auto.isVerhuurd = false;
            return true;
        }
        return false;
    }
}