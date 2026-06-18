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

    zoeken(zoekTerm) {
    return this.autos.filter(auto =>
        auto.merk.toLowerCase().includes(zoekTerm.toLowerCase()) ||
        auto.model.toLowerCase().includes(zoekTerm.toLowerCase())
    );
}

    autoVerwijderen(id) {
    this.autos = this.autos.filter(auto => auto.id !== id);
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