<?php

use Illuminate\Database\Seeder;

class criterionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // ---------------------------skupina Proces---------------------

        DB::table('criterions')->insert([
            'criterion_group_id' => '1',
            'name' => 'Rozsah',
            'description' => 'Kritérium  Rozsah  hodnotí  množství  procesů životního cyklu, které metodika pokrývá. Hodnocení se provádí na základě mapování procesů metodiky na procesy Referenčního modelu procesů dle ISO/IEC 12207.',
            'meaning' => 'Hodnota  tohoto  kritéria dává  představu  o šíři  záběru metodiky.  Pokud  má  organizace zájem na zlepšování procesů, je vhodné, aby  se alespoň  ve  výhledu  zabývala  procesy v širším  kontextu  a měla  tak  vytýčenou  cestu  neustálého  zlepšování.  Zpočátku  se organizace  zaměřuje  zejména  na  softwarové  procesy,  potom  na  procesy  spojené s řízením projektu a nakonec na procesy na úrovni celé organizace.',
            'scale' => '0:  jen procesy implementace SW;1:   procesy implementace a podpory SW;2:  převážně projektové procesy;3:  procesy implementace SW, podpory SW a projektové procesy;4:   systémové a softwarové procesy včetně projektových;5:  velmi vysoké pokrytí procesů referenčního modelu ISO/IEC 12207',
            'weight' => '',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '1',
            'name' => 'Model životního cyklu',
            'description' => 'Toto  kritérium  hodnotí  model  životního  cyklu, který  metodika  používá  (například vodopádový, V-model, iterativní apod.). U  metodik postavených  na iterativním modelu se hodnotí délka iterací.',
            'meaning' => 'Model životního cyklu je důležitým atributem metodiky. Většina metodik podporuje jen
jeden  model  životního  cyklu.  Moderní  vývoj  probíhá  většinou  iterativně,  existují  ale
projekty, kdy je vhodné použít například vodopádový životní cyklus. ',
            'scale' => '0:  žádný;
1:  vodopádový model;
2:  V-model;
3:  spirálový model;
4:  iterativní model, iterace > 1 měsíc;
5:  iterativní model, velmi krátké iterace (do měsíce);',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '1',
            'name' => 'Role',
            'description' => 'Role  představují  typové  skupiny  pracovníků,  kteří  vykonávají  obdobné  činnosti.  Rolí
může  být  velký  počet,  a proto  je  vhodné  seskupit  je  do  určitých  kategorií,  například
celopodnikové role SW inženýrské,  celopodnikové role řídící,  role zájmových skupin,
doménové  role,  SW  inženýrské  role  v projektu,  řídící  role  v projektu  a další  role
v projektu. Kritérium Role hodnotí, jaké kategorie rolí metodika pokrývá a jaký je počet
rolí v jednotlivých kategoriích. ',
            'meaning' => 'Toto kritérium souvisí  s kritériem  Rozsah  a hodnoty obou kritérií jsou přímo úměrné.
Čím  více  procesů  metodika  pokrývá,  tím  větší  je  zpravidla  počet  rolí  a podrobnější
popis procesu',
            'scale' => '0:  jen jedna role;
1:  2–5 SW inženýrských rolí v projektu;
2:  SW inženýrské i řídící role v projektu, celkem méně než 10 rolí;
3:  SW inženýrské i řídící role v projektu, více než 10 rolí;
4:  SW inženýrské i řídící role v projektu i celopodnikové role řídící;
5:  SW inženýrské i řídící role v projektu, celopodnikové SW inženýrské i řídící
role;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '1',
            'name' => 'Podrobnost popisu procesu',
            'description' => 'Kritérium  Podrobnost popisu procesu  hodnotí, jak podrobně jsou procesy  v metodice
popsány.  Pro  definování  stupnice  jsou  použity  úrovně  podrobnosti  popisu  procesu
definované v metodě KBPR.',
            'meaning' => 'Kritérium  Podrobnost  popisu  procesu  ovlivňuje  dělení  metodik  na  agilní  a rigorózní.
Kritérium  souvisí  s kritériem  Kvalifikace  členů týmu. Pokud jsou  v týmu kvalifikovaní
lidé, stačí méně podrobné procesy.',
            'scale' => '0:  nejsou definovány žádné procesy;
1:  u procesu jsou definovány cíle procesu, spouštěcí událost, zodpovědná role;
2:  popsány jsou navíc metriky a omezující podmínky;
3:  popsán navíc výstup procesu;
4:  popsány činnosti, role, vstupy, výstupy;
5:  vstupy, výstupy a role přiřazeny k činnostem;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '1',
            'name' => 'Dokumenty',
            'description' => 'Dokumenty  jsou  artefakty,  které jsou  vytvářeny,  modifikovány  nebo  užívány  v rámci
procesů  a činností.  Toto  kritérium  hodnotí,  jaké  množství  dokumentů  (pracovních
produktů) metodika vyžaduje. Hodnotí  se  mapováním na dokumenty  uvedené  v normě
ISO/IEC  15289.',
            'meaning' => 'Množství dokumentace,  její podrobnost  a formálnost  je také základem  dělení metodik
na  agilní  a rigorózní.   Pro  projekty  vysoké  důležitosti  potřebujeme  kvalitní
dokumentaci.  Podobně  v případech,  kdy  není  možná  osobní  komunikace  mezi  členy
týmu (například na distribuovaných projektech), je třeba ji nahradit dokumentací.',
            'scale' => '0:  není požadována dokumentace;
1:  minimální dokumentace v jednoduché formě;
2:  jen dokument Specifikace softwarových požadavků;
3:  vytváří se více než 40 % dokumentů;
4:  vytváří se více než 60 % dokumentů;
5:  vytváří se více než 80 % dokumentů;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '1',
            'name' => 'Metriky',
            'description' => 'Kritérium hodnotí, zda metodika pracuje
s metrikami a jaký význam jim přikládá. ',
            'meaning' => 'Metriky  jsou  základem  řízení,  poskytují  informaci  o stavu  projektu  a umožňují  jej
efektivněji řídit.  Metodika by měla  s metrikami pracovat, určit, které metriky používat,
a zajistit jejich sledování.',
            'scale' => '0:  nepracuje s metrikami;
1:  definuje některé metriky a způsob měření, ale jejich význam nepřeceňuje;
2:  definuje některé metriky a způsob měření, jejich význam je značný;
3:  definuje systém metrik, jejich měření je součástí metodiky;
4:  ucelený systém metrik, metodika je na metrikách závislá;
5:  na základě metrik dochází k zlepšování procesů;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '1',
            'name' => 'Řízení kvality',
            'description' => 'Zajištění kvality softwaru (Software Quality Assurance, SQA)  můžeme  definovat jako
„plánovaný  a systematický  přístup  k hodnocení  kvality  a dodržování  standardů
softwarových  produktů,  procesů  a procedur“  [Software  Quality  Assurance,  2007].
Kvalita  softwarového  produktu  musí  být  v průběhu  jeho  vývoje  hodnocena
a ověřována. ',
            'meaning' => 'S růstem významu softwaru rostou  i požadavky na jeho kvalitu. Metodika by se měla
explicitně zabývat řízením kvality a to v celém životním cyklu softwaru.',
            'scale' => '0:  nezabývá se řízením kvality;
1:  jen akceptační testování;
2:  provádí se testování softwaru,;
3:  provádí se testování softwaru i testování systému,;
4:  jsou definovány standardy kvality a metriky kvality;
5:  velký důraz na řízení kvality v celém životním cyklu, využití nástrojů;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        //--------------------skupina Podpora-------------------------------

        DB::table('criterions')->insert([
            'criterion_group_id' => '2',
            'name' => 'Celistvost zdrojů',
            'description' => 'Ne  všechny  metodiky  jsou  dostupné  jako  jeden  ucelený  zdroj,  který  obsahuje
komplexní  popis  metodiky.  Někdy  jsou informace  o metodice  roztříštěné  a musíme je
získávat  z různých  zdrojů  jako  články,  rozhovory,  knihy,  webové  stránky  apod.
Kritérium Celistvost zdrojů hodnotí, zda jsou zdroje metodiky ucelené nebo rozptýlené.',
            'meaning' => 'Pro  zavedení metodiky je důležité, jak  a v jaké formě je metodika dostupná, aby mohla
být  publikována  a komunikována  v týmu.  Jak  ukázaly  výsledky  průzkumu  používání
agilních metodik v České republice popsané v podkapitole 6.4, zavedení nové metodiky
brání  především  obava,  že  metodika  nebude  týmem  přijata.  Snadná  publikace
a komunikace metodiky by měla takové obavy zmírnit.',
            'scale' => '0:  žádné zdroje;
1:  informace jsou jen v článcích;
2:  informace jsou v různých zdrojích – články, rozhovory, knihy, webové stránky;
3:  metodika je v jednom základním zdroji;
4:  metodika je v jednom základním zdroji a navíc jsou k dispozici další zdroje;
5:  metodika je dostupná jako aplikace, snadná navigace, vyhledávání;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '2',
            'name' => 'Dostupnost',
            'description' => 'Kritérium  hodnotí,  v jaké  formě  je  metodika  dostupná.  Metodika  může  být  volně
dostupná  či  dostupná  v podobě  open-source  licence,  anebo  jako  komerční  produkt.
Někdy je popsána v komerčních publikacích.',
            'meaning' => 'Otázka  finančních  zdrojů  na  zakoupení,  případně  zavedení  metodiky  je  důležitá
zejména pro menší firmy, které spíše než komerční produkt sáhnou po volně dostupné
či open source metodice. ',
            'scale' => '0:  není veřejně dostupná
1:  dostupná v komerčních publikacích;
2:  komerční produkt;
3:  volně dostupná ;
4:  open-source licence;
5:  open-source licence i s nástroji na správu obsahu;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '2',
            'name' => 'Podpora metodiky softwarovými nástroji',
            'description' => 'Podpora  metodiky  softwarovými  nástroji  má  dvě  dimenze.  Jednak  jde  o podporu
jednotlivých činností, které jsou obsahem  metodiky. Příkladem  jsou třeba nástroje na
správu  požadavků,  nástroje  na  modelování,  nástroje  na  vývoj,  nástroje  na  testování.
Současný  trend  přitom  směřuje  k velmi  silné  integraci  těchto  nástrojů  a využívání
nástrojů  pro  podporu  celého  životního  cyklu  vývoje.  Druhou  dimenzí  podpory
metodiky  softwarovými  nástroji  je  podpora  správy  obsahu  a publikace  samotné
metodiky.  Některé  metodiky  jsou  velmi  podrobné,  metodiku  je  třeba  přizpůsobit  na
podmínky projektu, rozvíjet  a to je bez nástroje velmi obtížné. Proto je výhodou, když
pro  metodiku  jsou  takové  nástroje  k dispozici.  Kritérium  hodnotí,  zda  je  metodika
podpořena softwarovými nástroji a jak silná je tato podpora.',
            'meaning' => 'Pokud je metodika integrována  v nástrojích, je snazší zajistit její dodržování.  Existence
nástroje na správu obsahu umožňuje snadno udržovat, rozvíjet a publikovat metodiku.',
            'scale' => '0:  metodika není podpořena nástroji;
1:  metodika je integrována s nástroji, které podporují některé činnosti;
2:  metodika je přímo zabudována do jednoho vývojového nástroje;
3:  metodika je integrována s nástroji, které podporují celý životní cyklus vývoje;
4:  metodiku lze formou procesních šablon zabudovat do různých nástrojů;
5:  spolu s metodikou jsou dodávány nástroje na správu obsahu;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '2',
            'name' => 'Podpora zavedení metodiky',
            'description' => 'Kritérium  hodnotí,  jak  je  podporováno  zavedení  metodiky  ze  strany  distributorů
a dalších firem.',
            'meaning' => 'Zavedení  metodiky  budování  IS/ICT  není  jednoduchý  proces.  Samotné  zavádění  by
mělo probíhat jako projekt. Je třeba provést analýzu současného  stavu, vybrat vhodnou
metodiku,  přizpůsobit  metodiku  podmínkám  organizace  a projektu,  připravit  nástroje
a infrastrukturu, provést školení, ověřit metodiku na pilotním projektu, plně ji nasadit
do  prostředí.  Proto  je  výhodou,  když  existují  firmy,  které  zajistí  zavedení  metodiky,
anebo alespoň poskytnou konzultanty při zavádění.',
            'scale' => '0:   žádná podpora;
1:   možnost konzultací u distributora;
2:   poskytnutí konzultantů do firmy, která metodiku zavádí;
3:   konfigurace metodiky;
4:   konfigurace a školení metodiky;
5:   zavedení metodiky plně realizováno externí firmou;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '2',
            'name' => 'Přizpůsobení metodiky',
            'description' => 'Kritérium  hodnotí,  do  jaké  míry  metodika  umožňuje  přizpůsobit  ji  na  podmínky
konkrétní organizace a konkrétního projektu.',
            'meaning' => 'Jak jsem uvedla v podkapitole 5.2, každý projekt vyžaduje specifickou metodiku. Nemá
smysl vytvářet pokaždé úplně novou metodiku, ale je možné použít některou obecnější
metodiku  a přizpůsobit  ji  na  podmínky  organizace  a podmínky  konkrétního  projektu.
Přizpůsobení  na  podmínky  organizace  je  určováno  především  firemní  kulturou
a organizační  strukturou  organizace,  případně  používanými  nástroji.  Přizpůsobení  na
podmínky  projektu  je  určováno  zejména  důležitostí  projektu,  velikostí  a rozmístěním
týmu. Jednoznačnou výhodou je, pokud metodika  s přizpůsobením počítá a má nástroje
umožňující snadné přizpůsobení metodiky.',
            'scale' => '0:  nezabývá se přizpůsobováním metodiky;
1:  přizpůsobení metodiky je možné jen na začátku projektu;
2:  doporučuje přizpůsobení metodiky na začátku projektu;
3:  přizpůsobování metodiky je možné i v průběhu projektu (např. po každé iteraci;
4:  doporučuje přizpůsobování metodiky i v průběhu projektu;
5:  má nástroje na přizpůsobování metodiky;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '2',
            'name' => 'Výuka na vysokých školách',
            'description' => 'Kritérium hodnotí, zda je metodika vyučována na vysokých školách ve světě a v ČR.',
            'meaning' => 'Hodnota  tohoto  kritéria  poskytuje  informaci  o významu,  jaký  metodice  přikládá
akademická  komunita,  a jaké  znalosti  lze  očekávat  u absolventů  vysokých  škol  –
potenciálních zaměstnanců firem. Výhodou je, pokud se metodika na vysokých školách
učí,  a to  nejen  teoreticky,  ale  i praktické  použití  metodiky,  případně  alespoň  některé
techniky, které metodika využívá.',
            'scale' => '0:  neučí se na VŠ;
1:  učí se jen některé techniky, které jsou součástí metodiky;
2:  učí se jen v rámci přednášek ve světě;
3:  učí se praktické použití ve světě;
4:  učí se jen v rámci přednášek v ČR;
5:  učí se praktické použití v ČR;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '2',
            'name' => 'Školení a certifikace',
            'description' => 'Kritérium  hodnotí,  zda  jsou  pro  danou  metodiku  k dispozici  školení  a certifikace  ve světě a v ČR.',
            'meaning' => 'Kritérium ukazuje, jaký význam má  metodika v odborné komunitě a jaké jsou možnosti přípravy kvalifikovaných odborníků.',
            'scale' => '0:  nejsou školení ani certifikace;
1:  školení ve světě;
2:  školení i v ČR;
3:  školení a certifikace mimo Evropu;
4:  školení a certifikace v Evropě;
5:  školení a certifikace i v ČR;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '2',
            'name' => 'Lokalizace',
            'description' => 'Jak  ukázaly  výsledky  průzkumu  používání  agilních  metodik  v ČR,  který  byl  popsán
v podkapitole  6.4,  a také  předchozího  průzkumu  používání  metodik  [ŠŤOVÍČEK,
2002], míra používání formálních metodik v ČR je nízká. Důvodem je dle mého názoru
také  nedostatek  českých  metodik
3
a metodik  lokalizováných  do  češtiny.  Kritérium
hodnotí, zda je metodika dostupná v českém jazyce.',
            'meaning' => 'Pro  některé  firmy  může  být  nedostupnost  metodiky  v českém  jazyce  důvodem,  proč
metodiku  nezavedou.  Na  druhé  straně  firmy  se  zahraniční  spoluúčastí,  anebo
spolupracující se zahraničními partnery často vyžadují metodiku v anglickém jazyce.',
            'scale' => '0:  není v českém jazyce;
1:  x;
2:  x;
3:  částečná lokalizace;
4:  x;
5:  je plně v českém jazyce;',
            'weight' => '0',
            'status' => '1',
            'is_key' => '0',
        ]);

        //-------------------------------skupina Produkt------------------

        DB::table('criterions')->insert([
            'criterion_group_id' => '3',
            'name' => 'Důležitost produktu',
            'description' => 'Základním  kritériem,  které  odlišuje  jednotlivé  projekty,  je  důležitost  budovaného
systému (aplikace, služby). Důležitost produktu můžeme  posuzovat  z různých hledisek.',
            'meaning' => 'Kritérium Důležitost produktu je klíčové pro výběr metodiky. Kritérium souvisí s mírou
formálnosti metodiky a řízením kvality.',
            'scale' => '0:  jen pilotní projekt;
1:  doplňkový systém ( entertainment);
2:  systém podporující fungování organizace ( mission support);
3:  systém kritický pro poslání (mission critical) –  národní organizace;
4:  systém kritický pro poslání (mission critical) –  nadnárodní organizace;
5:  systém, na kterém závisí životy lidí (life critical);',
            'weight' => '0.219',
            'status' => '1',
            'is_key' => '1',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '3',
            'name' => 'Délka projektu',
            'description' => 'Kritérium hodnotí,  v jakém časovém horizontu má být produkt realizován.  Hodnotí se
počtem měsíců.',
            'meaning' => 'V současné  době,  kdy  IS/ICT  ovlivňují  konkurenceschopnost  i samotnou  existenci
firem,  je  rychlost  zavedení  softwarového  produktu  zásadní.  Pro  projekty  s krátkou
dobou realizace je důležité mít metodiku, která je pro takový projekt vhodná.',
            'scale' => '0:  do 1 měsíce;
1:  do 3 měsíců;
2:  do 6 měsíců;
3:  do 12 měsíců;
4:  do 24 měsíců;
5:  nad 24 měsíců;',
            'weight' => '0.133',
            'status' => '1',
            'is_key' => '1',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '3',
            'name' => ' Stálost požadavků',
            'description' => 'Kritérium  hodnotí,  do  jaké  míry  je  možné  požadavky  předem  definovat  a jak  se
v průběhu projektu mění.',
            'meaning' => 'Toto  kritérium  je  zásadní  při  rozhodování  mezi  agilní  a rigorózní  metodikou.
Pro projekty, kde není možné požadavky předem stanovit, anebo se hodně mění, nejsou
rigorózní metodiky vhodné a měly by se použít agilní metodiky.',
            'scale' => '0:  požadavky není možné detailně předem stanovit;
1:  požadavky se z více než 50 % mění;
2:  procento změn požadavků je cca 30 %;
3:  požadavky lze definovat předem, mění se jen priority požadavků;
4:  požadavky lze definovat předem, mění se, ale snahou je změny potlačovat;
5:  požadavky lze definovat předem a nemění se;',
            'weight' => '0.041',
            'status' => '1',
            'is_key' => '1',
        ]);
        DB::table('criterions')->insert([
            'criterion_group_id' => '3',
            'name' => 'Znovupoužitelnost',
            'description' => 'Kritérium hodnotí, do jaké míry se v rámci řešení používají a vytvářejí znovupoužitelné
artefakty.  Pokud  se  vytvářejí  znovupoužitelné  prvky,  rozlišuje  se,  zda  jde  o třídy
použitelné jen  v rámci jednoho programového prostředí (hodnota 2), anebo spustitelné
komponenty  či  webové  služby,  které lze  použít  v různých  programových  prostředích.
Dále  se  rozlišuje,  zda  se  znovupoužitelné  prvky  vytvářejí  a používají  jen  v rámci
jednoho  projektu,  anebo  přes  projekty,  v rámci  organizace.',
            'meaning' => 'Kritérium je důležité pro volbu mezi agilními  a rigorózními metodikami, neboť jedním
z předpokladů použití agilních metodik  je, že vytvářený produkt uspokojuje současné
potřeby a cílem není vytvořit znovupoužitelné řešení ani znovupoužitelné komponenty.',
            'scale' => '0:  cílem není znovupoužitelnost;
1:  snaha používat již hotové komponenty;
2:  snaha vytvářet znovupoužitelné třídy v rámci projektu;
3:  snaha vytvářet znovupoužitelné spustitelné komponenty v rámci projektu;
4:  snaha vytvářet znovupoužitelné spustitelné komponenty v rámci organizace;
5:  cílem je maximální znovupoužitelnost v rámci organizace;',
            'weight' => '0.033',
            'status' => '1',
            'is_key' => '1',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '3',
            'name' => 'Velikost řešení',
            'description' => 'Jedním z kritických faktorů při vývoji softwaru je  potřeba určit  velikost softwarového
produktu. V minulosti byly navrhovány pro měření velikosti  softwaru  různé  numerické
metody  jako  počet  řádků  zdrojového  kódu  a různé  míry  odvozené  z  technických
charakteristik  softwaru.  Tyto  míry  je  ale  obtížné  použít  v počátečních  fázích  vývoje. Protože  měření  velikosti  softwaru  pomocí  těchto
metod je dosti náročné, je  použit  pro toto  kritérium  jen  hrubý  odhad velikosti  softwaru
ve formě počtu případů užití (use case).',
            'meaning' => 'Kritérium Velikost řešení souvisí s kritériem Velikost týmu a obě jsou klíčová pro volbu
mezi agilní a rigorózní metodikou. Je známo, že agilní metodiky jsou vhodné spíše pro
menší projekty.',
            'scale' => '0:  1–10;
1:  11–40;
2:  41–100;
3:  101–200;
4:  201–300;
5:  300+;',
            'weight' => '0.039',
            'status' => '1',
            'is_key' => '1',
        ]);

        //------------------------------skupina Lidé-----------------------------

        DB::table('criterions')->insert([
            'criterion_group_id' => '4',
            'name' => 'Zkušenost manažera projektu',
            'description' => 'Pro  úspěch  softwarového  projektu  je  klíčová  role  projektového  manažera,  jeho
schopnosti  a zkušenosti.  Stupnice rozlišuje počet  let,  po která  manažer projektu působí
v této  roli.  Stupnice  je  obrácená,  protože  se  při  hodnocení  metodiky  posuzuje,  jak
zkušeného manažera projektu metodika vyžaduje. ',
            'meaning' => 'Zkušenost
projektového manažera je pro projekt velmi důležitá. Z podstaty agilních metodik, které
předpokládají zkušené členy týmu, vyplývá, že by měl být  i zkušený  manažer projektu.
Ale  i tradiční  metodiky,  které  se  používají  spíše  pro  velké,  distribuované  projekty
potřebují zkušeného manažera, jenž dokáže tak velký projekt řídit.',
            'scale' => '0:  5+;
1:  4–5 let;
2:  3–4 roky;
3:  2–3 roky;
4:  1–2 roky;
5:  0–1 rok;',
            'weight' => '0.015',
            'status' => '1',
            'is_key' => '1',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '4',
            'name' => 'Kvalifikace členů týmu',
            'description' => 'Metodiku  je  třeba  přizpůsobit  konkrétním  lidem,  jejich  znalostem  a schopnostem.
Kritérium  hodnotí  kvalifikaci  členů  týmu  (kromě  manažera).  Kvalifikací  se  rozumí
znalosti,  dovednosti  a zkušenosti  pro  vykonávání  činností  dané  role,  jde  zejména
o zkušenosti  s danou  technologií,  nástroji,  metodami.  Stupnice  je  opět  obrácená  –  od
požadavků na vysoce kvalifikované  členy  a jejich velký počet  po méně kvalifikované.
Při hodnocení metodiky se posuzuje, jak kvalifikované členy týmu metodika vyžaduje.',
            'meaning' => 'Kvalifikace  členů týmu  je klíčová pro výběr metodiky. Je známo, že agilní metodiky
předpokládají  velmi  kvalifikované  členy  týmu  se  širokým  zaměřením  (nejsou
specializovaní jen na analýzu, návrh, programování, testování). ',
            'scale' => '0:  více než 70 % členů týmu je kvalifikovaných s širokým zaměřením;
1:  více než 70 % členů týmu je kvalifikovaných, ale specializovaných;,
2:  cca 50 % členů týmu je málo kvalifikovaných;
3:  více než 60 % členů týmu je málo kvalifikovaných;
4:  více než 70 % členů týmu je málo kvalifikovaných;
5:  více než 80 % členů týmu je málo kvalifikovaných;',
            'weight' => '0.020',
            'status' => '1',
            'is_key' => '1',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '4',
            'name' => 'Motivace členů týmu',
            'description' => 'Kritérium hodnotí,  jak motivovaní jsou členové týmu (kromě manažera)  a jaké morální
a charakterové vlastnosti mají.  Hodnota  kritéria se určuje podle motivace  většiny  členů
týmu  (více  než  80  %  členů).  Stupnice  je  opět  obrácená  a při  hodnocení  metodiky  se
posuzuje, jak velkou míru motivace metodika u členů týmu předpokládá proto, aby byla
úspěšně použita.',
            'meaning' => 'Agilní  metodiky  jsou  postaveny  na  samoorganizujících  se  týmech  s rozhodovací
pravomocí.  To  samozřejmě  klade  nároky  na  morální  kvality  členů  týmu  a systém
motivace zavedený v organizaci.',
            'scale' => '0:  motivovaní jedinci vysokých morálních kvalit, sdílí znalosti, sami se organizují;
1:  aktivní, motivovaní jedinci, sdílí znalosti;
2:  plní zadané úkoly, sdílí znalosti;
3:  plní zadané úkoly, nesdílí znalosti;
4:  jedinci jsou špatně motivováni a snaží se vyhýbat úkolům, nesdílí znalosti;
5:  žádná motivace;',
            'weight' => '0.020',
            'status' => '1',
            'is_key' => '1',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '4',
            'name' => 'Dostupnost uživatelů',
            'description' => 'Tradiční  metodiky  vyžadují  zapojení  zákazníka  na  začátku  projektu  při  specifikaci
požadavků  a uzavření  smlouvy  a potom  v závěru  projektu,  kdy  akceptuje  řešení.
Iterativní  vývoj  předpokládá  častější  zpětnou  vazbu.  Kritérium  hodnotí  míru  zapojení
zákazníka do projektu.',
            'meaning' => 'Velmi  důležité  kritérium,  které  souvisí  s kritériem  Stálost  požadavků.  Čím  více  se
požadavky  mění,  tím  dostupnější  by  měli  být  uživatelé  v průběhu  projektu.  Agilní
metodiky  předpokládají  denní  účast  uživatele  na  projektu  a přenášejí  na  něj
odpovědnost za definování požadavků.',
            'scale' => '0:  uživatel je součástí týmu, má odpovědnost za požadavky;
1:  uživatel je k dispozici denně;
2:  uživatel je k dispozici kdykoli na vyžádání;
3:  uživatel je k dispozici na začátku, konci a v průběhu projektu v předem určených milnících;
4:  uživatel je k dispozici jen na začátku a na konci projektu;
5:  uživatel není dostupný;',
            'weight' => '0.200',
            'status' => '1',
            'is_key' => '1',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '4',
            'name' => 'Velikost týmu',
            'description' => 'Kritérium hodnotí velikost týmu na základě počtu jeho členů včetně manažera projektu.
Každý  člen  týmu  se  započítává jako jedna  osoba,  i když  není  plně  alokován  na  daný
projekt.',
            'meaning' => 'Důležité  kritérium  pro  výběr  metodiky.  Jak  říká  jeden  z principů  návrhu  metodiky,
uvedených  v podkapitole  7.1.2,  „Váha  metodiky  je  přímo  úměrná  velikosti  týmu“.
S rostoucím  počtem  členů  týmu  roste  objem  komunikace  mezi  nimi.  Metodika  musí
tuto  komunikaci řídit,  a proto musí být formálnější. Agilní metodiky  v původním pojetí
jsou  určeny  pro  malé  týmy,  v poslední  době  se  ale  přizpůsobují  na  projekty  řešené
většími týmy.',
            'scale' => '0:  1–4;
1:  5–10;
2:  11–20;
3:  21–50;
4:  51–100;
5:  více než 100;',
            'weight' => '0.169',
            'status' => '1',
            'is_key' => '1',
        ]);

        DB::table('criterions')->insert([
            'criterion_group_id' => '4',
            'name' => 'Rozmístění',
            'description' => 'Kritérium hodnotí, jak jsou členové týmu (kromě manažera) geograficky distribuováni',
            'meaning' => 'Důležité kritérium pro výběr metodiky. Agilní metodiky  v původním pojetí  zdůrazňují
osobní komunikaci  a jsou určeny  pro malé týmy  v jedné lokaci. Postupně se ale  i agilní
metodiky mění tak, aby je bylo možné použít i pro větší a distribuované týmy.',
            'scale' => '0:  v jedné místnosti;
1:  v jedné budově;
2:  více míst v jednom městě;
3:  dvě místa v jedné zemi;
4:  více míst v jedné zemi;
5:  více míst v různých zemích;',
            'weight' => '0.113',
            'status' => '1',
            'is_key' => '1',
        ]);

    }
}
