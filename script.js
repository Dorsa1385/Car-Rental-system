const systeem = new RentalSystem();
let autoIdTeller = 1;

systeem.autoToevoegen(new Car(1, "Tesla", "Model 3", "Elektrisch", 80));
systeem.autoToevoegen(new Car(2, "BMW", "X5", "SUV", 120));
systeem.autoToevoegen(new Car(3, "Audi", "A4", "Sedan", 90));

autoIdTeller = 4;

const autoForm = document.getElementById('autoForm');
const boodschapFormulier = document.getElementById('boodschap');
const autoLijstElement = document.getElementById('autoLijst');
const zoekBalk = document.getElementById('zoekBalk');
const typeFilter = document.getElementById('typeFilter');

function updateLijstOnScreen(autosOmTeTonen = null) {
    autoLijstElement.innerHTML = "";

    const alleAutos = autosOmTeTonen || systeem.alleAutosWeergeven();

    if (alleAutos.length === 0) {
    autoLijstElement.innerHTML = "<p>Geen resultaten</p>";
    return;
}

    alleAutos.forEach(auto => {
        const card = document.createElement('div');
        card.className = 'auto-card';

        const statusKlasse = auto.isVerhuurd ? 'verhuurd' : 'beschikbaar';
        const statusTekst = auto.isVerhuurd ? 'Verhuurd' : 'Beschikbaar';

        card.innerHTML = `
            <button class="btn-verwijderen" title="Auto verwijderen">✖</button>
            <h3>${auto.merk} ${auto.model}</h3>
            <p>Huurprijs: €${auto.huurprijs} per dag</p>
            <span class="status-badge ${statusKlasse}">${statusTekst}</span>
            <div class="card-actions"></div>
        `;

        const verwijderKnop = card.querySelector('.btn-verwijderen');

        verwijderKnop.addEventListener('click', () => {
            systeem.autoVerwijderen(auto.id);
            updateLijstOnScreen();
        });

        const actionsDiv = card.querySelector('.card-actions');
        const knop = document.createElement('button');

        if (!auto.isVerhuurd) {

            knop.innerText = "Auto Huren";
            knop.className = "btn-huren";

            knop.addEventListener('click', () => {
                const succes = systeem.autoHuren(auto.id);

                if (succes) {
                    voerZoekingUit();
                }
            });

        } else {

            knop.innerText = "Terugbrengen";
            knop.className = "btn-terug";

            knop.addEventListener('click', () => {
                const succes = systeem.autoTerugbrengen(auto.id);

                if (succes) {
                    voerZoekingUit();
                }
            });
        }

        actionsDiv.appendChild(knop);
        autoLijstElement.appendChild(card);
    });
}

function voerZoekingUit() {
    const zoekTerm = zoekBalk.value.toLowerCase();
    const gekozenType = typeFilter.value;

    let autos = systeem.alleAutosWeergeven();

    autos = autos.filter(auto =>
        auto.merk.toLowerCase().includes(zoekTerm) ||
        auto.model.toLowerCase().includes(zoekTerm)
    );

    if (gekozenType !== "Alle") {
        autos = autos.filter(auto => auto.type === gekozenType);
    }

    updateLijstOnScreen(autos);
}

zoekBalk.addEventListener('input', voerZoekingUit);
typeFilter.addEventListener('change', voerZoekingUit);

autoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const merkWaarde = document.getElementById('merk').value;
    const modelWaarde = document.getElementById('model').value;

    const nieuweAuto = new Car(
        autoIdTeller,
        merkWaarde,
        modelWaarde,
        "Sedan",
        50
    );

    systeem.autoToevoegen(nieuweAuto);

    zoekBalk.value = "";
    updateLijstOnScreen();

    boodschapFormulier.style.color = "#10b981";
    boodschapFormulier.innerText = "Succes! De auto is toegevoegd!";

    autoForm.reset();
    autoIdTeller++;
});

updateLijstOnScreen();