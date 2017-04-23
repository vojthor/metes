#Aplikace Metes

## Potřebné programy

* Webový server
* Node.js
* NPM
* Composer
* Gulp
* PHP7
* MySQL

## Spuštění aplikace


Jako první je nezbytné stáhnout PHP knihovny a samotný framework Laravel, pro tento účel je určten nástroj Composer. Všechny závislosti jsou definované v souboru composer.json uloženém v repositáři, po konfiguraci nástroje Composer stačí spustit pouze příkaz composer install v adresáři s projektem.
```
/adresar_s_projektem/composer install
```

Po stažení potřebných knihoven je nutné přejmenovat soubor .env.example na .env a změnit potřebné údaje. Tento soubor může být na některých operačních systémech standardně skrytý. V tomto souboru je nutné pro správný chod aplikace nastavit připojení do databáze. 
```
DB_HOST=127.0.0.1 // Adresa databáze, pokud běží na stejném počítači, lze ponechat
DB_DATABASE=homestead // Jméno databáze
DB_USERNAME=homestead // Uživatel datábáze
DB_PASSWORD=secret // Heslo pro uživatele
CACHE_DRIVER=file // nesouvisí s databáze, na některých systémech způsobuje pád aplikace, vhodné změnit na file na array
```
Dalším krokem je vytvoření unikátního klíče aplikace na konkrétním počítači, toto vytvoření je realizováno nástrojem Artisan a bez něho není aplikace funkční. Stačí zadat v adresáři s projektem do příkazové řádky příkaz ve Výpis kódu 65
```
php artisan key:generate 
```
Před spuštěním databázových migrací je potřeba nakonfigurovat knihovnu pro uživatelského role. Tato konfigurace se nachází v kořenovém adresáři ve složce vendors, v souboru v na následující cestě /vendor/zizaco/entrust/src/config/config.php. Tuto konfiguraci nelze zanést do repositáře, jelikož tato knihovna je stažena až na koncovém počítači a soubor by byl přepsán.

```/adresar_projektu/vendor/zizaco/entrust/src/config/config.php

Řádek 22: 'role' => 'App\Role', -> 'role' => 'App\Models\Role',
Řádek 43: 'permission' => 'App\Permission','permission' => 'App\Models\Permission',
```

K zprovoznění serverové části je už pouze nutné vytvořit příslušnou databázi a uživatele. Nastavení webového server je individuální pro každý systém, jen je vhodné uvést, že k webu je nutné přistupovat přes složku /public v adresáři projektu, nikoliv přímo přes kořenový adresář. V závislosti na systému je případně nutné nastavit alias na tuto složku. 
Nyní je možné vytvořit strukturu databáze a naplnit ji základními daty – vše lze udělat jedním příkazem pomocí nástroje Artisan.
```
php artisan migrate:refresh --seed
```

Serverová část a databáze jsou takto kompletní, stažení JavaScriptových knihoven je realizováno pomocí nástroje NPM, příkazem npm install. Po stažení všech knihoven je nutné spustit příkaz gulp, který aplikaci sestaví. Po prvotním sestavení je možné pustit příkaz gulp watch spouštějící Browsersync. Nástroj node.js pak sleduje všechny změny v soubore a automaticky obnovuje připojené prohlížeče.
```
npm install // stažení JavaScriptových knihoven
gulp // sestavení aplikace, nutné po každé změně v kódu
gulp watch // sledování změn pomocí Browsersync a automatické sestavování
gulp --production // sestavení aplikace na produkci obsahující například minifikaci
```

V případě problému s aplikací mne neváhejte kontaktovat na e-mailu

```
vojtech.nezdara@gmail.com
```