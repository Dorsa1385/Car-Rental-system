const systeem = new RentalSystem();
let autoIdTeller = 1;

// NIEUW - standaard auto's zodat gebruiker direct auto's kan bekijken
systeem.autoToevoegen(new Car(1, "Tesla", "Model 3", "Elektrisch", 80));
systeem.autoToevoegen(new Car(2, "BMW", "X5", "SUV", 120));
systeem.autoToevoegen(new Car(3, "Audi", "A4", "Sedan", 90));

autoIdTeller = 4;

const autoForm = document.getElementById('autoForm');
const boodschapFormulier = document.getElementById('boodschap');
const autoLijstElement = document.getElementById('autoLijst');
const zoekBalk = document.getElementById('zoekBalk');

function updateLijstOnScreen(autosOmTeTonen = null) {
    autoLijstElement.innerHTML = "";

    const alleAutos = autosOmTeTonen || systeem.alleAutosWeergeven();

    alleAutos.forEach(auto => {
        const card = document.createElement('div');
        card.className = 'auto-card';

        const statusKlasse = auto.isVerhuurd ? 'verhuurd' : 'beschikbaar';
        const statusTekst = auto.isVerhuurd ? 'Verhuurd' : 'Beschikbaar';

        card.innerHTML = `
            <button class="btn-verwijderen" title="Auto verwijderen">✖</button>
            <h3>${auto.merk} ${auto.model}</h3>
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
    const zoekTerm = zoekBalk.value;
    const gefilterdeAutos = systeem.zoeken(zoekTerm);
    updateLijstOnScreen(gefilterdeAutos);
}

zoekBalk.addEventListener('input', voerZoekingUit);

autoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const merkWaarde = document.getElementById('merk').value;
    const modelWaarde = document.getElementById('model').value;

    const nieuweAuto = new Car(
        autoIdTeller,
        merkWaarde,
        modelWaarde,
        "Sedan",
        0
    );

    systeem.autoToevoegen(nieuweAuto);

    zoekBalk.value = "";
    updateLijstOnScreen();

    boodschapFormulier.style.color = "#10b981";
    boodschapFormulier.innerText = "Succes! De auto is toegevoegd!";

    autoForm.reset();
    autoIdTeller++;
});

// NIEUW - toont auto's direct wanneer de pagina opent
updateLijstOnScreen();