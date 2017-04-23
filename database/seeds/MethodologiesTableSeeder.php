<?php

use Illuminate\Database\Seeder;

class MethodologiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('methodologies')->insert([
            'name' => 'Metodika Rational Unified Process',
            'shortcut' => 'RUP',
            'version' => '2003.06.15',
            'owner' => 'IBM',
            'publisher' => 'IBM',
            'licence' => '',
            'certificate' => 'Yes',
            'language' => 'en',
            'url' => 'http://www.ibm.com/software/rational',
            'description' => 'Metodika  Rational  Unified  Process  (RUP)  je  „softwarový  inženýrský  proces,  který představuje  disciplinovaný  přístup  přiřazující  úkoly  a odpovědnosti  v organizaci zabývající se vývojem softwaru“ [Rational Unified Process,  2008].  Metodika  RUP  je založena  na  nejlepších  praktikách  softwarového  vývoje:  iterativní  vývoj,  řízení požadavků,  použití komponentové architektury,  vizuální modelování,  kontrola kvality softwaru a řízení změn. ',
            'note' => '',
        ]);

        DB::table('methodologies')->insert([
            'name' => 'Open Unified Process,',
            'shortcut' => 'OpenUP',
            'version' => 'FOWLER, 2006',
            'owner' => '',
            'publisher' => 'The Eclipse Foundation',
            'licence' => 'No',
            'certificate' => 'No',
            'language' => 'cz',
            'url' => 'http://epf.eclipse.org/wikis/openup/',
            'description' => 'OpenUP  je  minimálně  dostatečná,  kompletní  metodika  pro  vývoj  softwaru,  která  je snadno přizpůsobitelná a rozšiřitelná. Vznikla zeštíhlením metodiky Unified Process, je tedy  založena na iterativním  a inkrementálním  modelu životního  cyklu,  případech užití, řízení rizik  a architektuře.  Metodika  OpenUP  je postavena na  4 základních  principech, které  odpovídají  4 hodnotám  definovaným  v Manifestu  agilního  vývoje  softwaru - spolupráce pro sladění zájmů a porozumění cílům projektu, hodnocení priorit s cílem maximalizace hodnoty pro zákazníka, včasné zaměření na architekturu s cílem minimalizace rizik, kontinuální zpětná vazba a zlepšování',
            'note' => 'Základním  principem  metodiky  OpenUP  je  oddělení znovupoužitelného  metodického obsahu  od  jeho  aplikace  v procesu.  ',
        ]);

        DB::table('methodologies')->insert([
            'name' => 'Scrum',
            'shortcut' => 'SCRUM',
            'version' => '2008',
            'owner' => '',
            'publisher' => 'Scrum.org',
            'licence' => 'No',
            'certificate' => 'Yes',
            'language' => 'en',
            'url' => 'https://www.scrum.org/',
            'description' => 'Podle  výsledků  průzkumů  [AMBLER,  2006]  patří  Scrum  spolu  s XP  mezi nejpoužívanější  agilní  metodiky.  Metodika  Scrum  je  zaměřena  hlavně  na  řízení projektu.  Autoři metodiky jsou přesvědčeni, že vývoj softwaru  není definovaný proces, jak rigorózní metodiky předpokládají, ale empirický proces, který vyžaduje odlišný styl řízení.  Scrum  je  anglicky  skrumáž (mlýn)  v rugby  a tento název byl  vybrán  proto, že metodika  Scrum  je,  podobně  jako  hra  rugby,  adaptivní,  rychlá  a postavená  na samoorganizujících  týmech.',
            'note' => '',
        ]);

        DB::table('methodologies')->insert([
            'name' => 'Extrémní programování',
            'shortcut' => 'XP',
            'version' => '2007',
            'owner' => '',
            'publisher' => '',
            'licence' => 'No',
            'certificate' => 'No',
            'language' => 'en',
            'url' => 'http://www.extremeprogramming.org/',
            'description' => 'Extrémní  programování  je  velmi  „lehká“,  ale  disciplinovaná  metodika,  která  zavádí specifické  praktiky  jako  párové  programování,  refaktorizace,  testy  před  kódováním a další.  Patří mezi nejpopulárnější  a nejpoužívanější agilní metodiky.',
            'note' => '',
        ]);

        DB::table('methodologies')->insert([
            'name' => 'Microsoft Solutions Framework for CMMI Process Improvement',
            'shortcut' => 'MSF CMMI',
            'version' => '1',
            'owner' => 'Microsoft',
            'publisher' => 'Microsoft',
            'licence' => 'No',
            'certificate' => 'No',
            'language' => 'en',
            'url' => 'https://msdn.microsoft.com/en-us/library/jj161047(v=vs.120).aspx',
            'description' => 'Rámec  MSF  definuje  dva  modely  –  týmový  a procesní.  Týmový  model  určuje,  jak organizovat  pracovníky  a jejich  aktivity  tak,  aby  byl  projekt  úspěšný.  MSF  rozděluje tým  na  sedm  skupin,  které  jsou  znázorněny  na  obrázku  9-34.  Pro  každou  skupinu  je definována  oblast  zájmu,  cíle,  zainteresované  strany  a funkční  oblasti,  které  skupina pokrývá.  V každé  funkční  oblasti  jsou  definovány  klíčové  aktivity  a odpovědnosti. V rámci jednotlivých skupin týmového modelu jsou definovány role.',
            'note' => '',
        ]);

        DB::table('methodologies')->insert([
            'name' => 'Feature Driven Development',
            'shortcut' => 'FDD',
            'version' => 'PALMER, 2002',
            'owner' => 'Nebulon Pty. Ltd.',
            'publisher' => 'Nebulon Pty. Ltd.',
            'licence' => '',
            'certificate' => 'Yes',
            'language' => 'en',
            'url' => 'Feature Driven Development',
            'description' => 'Metodika  Feature  driven  development  (FDD)  představuje  zlatou  střední  cestu  mezi rigorózními  a agilními  metodikami.  Ač  se  svými  principy  řadí  mezi  agilní  metodiky, definuje  procesy,  byť  odlehčené,  a zdůrazňuje  nutnost  modelování  předem.  Je formálnější než ostatní agilní metodiky,  a tak ji lze úspěšně použít  i na větší projekty.',
            'note' => '',
        ]);
    }
}
