import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaSection from "@/components/ui/CtaSection";
import FeatureBlock from "@/components/produkt/FeatureBlock";
import Platforms from "@/components/produkt/Platforms";
import {
  BriefVisual,
  CaptureVisual,
  MemoryVisual,
  ActionsVisual,
  ConnectorsVisual,
} from "@/components/produkt/Visuals";

export const metadata: Metadata = {
  title: "Produkt",
  description:
    "Ranní brifink, večerní zachytávání, dlouhodobá paměť, agentní akce a konektory. Pět vrstev, ze kterých se skládá DAYLY.",
};

export default function ProduktPage() {
  return (
    <>
      <PageHero
        tag="Produkt"
        title={
          <>
            Pět vrstev. Jeden agent, který{" "}
            <span className="serif tinted">drží tvůj den pohromadě</span>.
          </>
        }
        lead="DAYLY není chatbot, do kterého píšeš dotazy. Je to smyčka: ráno ti agent poskládá den, přes den navrhuje a vyřizuje, večer se učí z toho, co se stalo. Tady je rozebraná na jednotlivé části."
      />

      <div className="container">
        <FeatureBlock
          id="brifink"
          tag="01 · Ranní brifink"
          title="Přehled dne, který má úsudek"
          bullets={[
            "Priority seřazené podle kontextu, ne podle času vytvoření",
            "Upozornění na kolize a rizikové dny dopředu",
            "Připomínky z dlouhodobé paměti — výročí, sliby, otevřené smyčky",
            "Počasí a dojezd jen tehdy, když mění tvoje plány",
          ]}
          visual={<BriefVisual />}
        >
          <p>
            Kalendář ti umí ukázat, co máš. Brifink ti řekne, <strong>na čem záleží</strong>.
            Každé ráno v čas, který si nastavíš, projde DAYLY tvůj kalendář, úkoly
            a paměť — a místo výpisu ti pošle tři až pět vět, které bys jinak
            skládal v hlavě sám u první kávy.
          </p>
          <p>
            Když je den nabitý, řekne ti to na rovinu a rovnou navrhne, co posunout.
            Když je volný, připomene, k čemu ses chtěl vrátit. A protože zná
            historii, všimne si věcí, které v kalendáři nejsou: že slíbený follow-up
            visí už týden, nebo že zítřejší schůzka navazuje na e-mail, který jsi
            nedočetl.
          </p>
        </FeatureBlock>

        <FeatureBlock
          id="zachytavani"
          tag="02 · Večerní zachytávání"
          title="Řekni, co se stalo. O zbytek se postará agent."
          flip
          bullets={[
            "Hlasem nebo textem, klidně jednou větou",
            "Extrakce úkolů, lidí, termínů a souvislostí",
            "Všechno vytěžené se ukazuje ke kontrole — nic se neukládá potajmu",
          ]}
          visual={<CaptureVisual />}
        >
          <p>
            Nejcennější kontext dne se ztrácí večer: co kdo slíbil, co se posunulo,
            co tě napadlo cestou domů. DAYLY ho posbírá za dvě minuty — večer se
            zeptá, jak den proběhl, a ty prostě <strong>mluvíš</strong>.
          </p>
          <p>
            Z volného vyprávění agent vytěží strukturu: úkoly s termíny, nové
            informace o lidech, bloky času, které si chceš chránit. Uvidíš přesně,
            co si z toho odnesl, a jedním klepnutím opravíš, co pochopil špatně.
            Žádné formuláře, žádné štítky, žádná údržba systému.
          </p>
        </FeatureBlock>

        <FeatureBlock
          id="pamet"
          tag="03 · Dlouhodobá paměť"
          title="Paměť, která ví, co zapomenout"
          bullets={[
            "Pracovní, epizodická a trvalá vrstva s různou životností",
            "Noční konsolidace — z jednotlivostí se stávají trvalé fakty",
            "Celou paměť si můžeš zobrazit, upravit nebo smazat",
          ]}
          visual={<MemoryVisual />}
        >
          <p>
            Uložit všechno je snadné. Těžké je vytáhnout ve správný moment
            <strong> jen to podstatné</strong> — a přesně na tom stojí DAYLY. Paměť má tři
            vrstvy: pracovní drží dnešní den, epizodická poslední týdny, trvalá
            dlouhodobé fakty o tobě a lidech kolem tebe.
          </p>
          <p>
            V noci proběhne konsolidace: opakující se vzorce se povýší na trvalé
            fakty, jednorázový šum se nechá vyhasnout. Díky tomu agent po roce
            používání neodpovídá pomaleji ani hůř — naopak, zná tě líp a paměť
            zůstává čistá.
          </p>
        </FeatureBlock>

        <FeatureBlock
          id="akce"
          tag="04 · Agentní akce"
          title="Od návrhů k činům — tvým tempem"
          flip
          bullets={[
            "Každý typ akce povoluješ zvlášť, per služba",
            "Kompletní log: co, kdy, proč a s čím agent udělal",
            "Autonomie jde kdykoliv jedním přepínačem vypnout",
          ]}
          visual={<ActionsVisual />}
        >
          <p>
            Tady se DAYLY láme z asistenta na agenta. Začíná to nevinně: draft
            e-mailu, návrh přesunu úkolu, nalezený termín. Všechno čeká na tvoje
            schválení. Ale když stejný typ akce potvrdíš podesáté, agent se
            zeptá: <strong>„Mám tohle příště dělat sám?“</strong>
          </p>
          <p>
            Důvěra se buduje postupně a je celou dobu ve tvých rukou. Citlivé
            akce — platby, odesílání zpráv — zůstávají za potvrzením vždy, dokud
            je sám explicitně neuvolníš. A každá autonomní akce se zapíše do logu,
            který si můžeš kdykoliv projít.
          </p>
        </FeatureBlock>

        <FeatureBlock
          id="konektory"
          tag="05 · Konektory"
          title="Agent s rukama v tvých službách"
          bullets={[
            "Postaveno na Model Context Protocol (MCP)",
            "Minimální oprávnění — jen scope, který konektor opravdu potřebuje",
            "Každý konektor jde připojit i odpojit jedním klepnutím",
          ]}
          visual={<ConnectorsVisual />}
        >
          <p>
            Brifink bez kalendáře je horoskop. Aby měl agent úsudek, musí vidět
            do služeb, kde tvůj den skutečně žije — a aby byl užitečný, musí do
            nich umět <strong>i zapisovat</strong>.
          </p>
          <p>
            Konektory stavíme na MCP, otevřeném standardu pro napojování AI na
            nástroje. V praxi to znamená rychlejší přibývání integrací a žádný
            vendor lock-in: až vyjde konektor, který ti chybí, připojíš ho k DAYLY
            stejně snadno jako kalendář. Začínáme kalendáři, mailem a poznámkami,
            pokračujeme financemi a komunikací.
          </p>
        </FeatureBlock>
      </div>

      <Platforms />
      <CtaSection />
    </>
  );
}
