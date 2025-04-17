// JWT Autentifikacija

// JWT (JSON Web Token) - tai tiesiog tekstinis raktas (tokenas), kurį serveris sugeneruoja ir atiduoda vartotojui.
// Tas tokenas saugo informaciją (dažniausiai vartotojo ID) ir yra pasirašomas serverio slaptažodžiu, kurį laikome .env faile.
// Token yra suagomas naršyklės localStorage, kad vėliau galėtume jį naudoti autentifikacijai.
// Kai vartotojas prisijungia, mes patikriname ar jis turi tokeną localStorage ir jei taip, siunčiame jį kartu su užklausa į serverį.

// Eiga:

// Registracija

// 1. Vartotojas suveda email ir slaptažodį ir spaudžia Registruotis mygtuką.
// FRONTEND: mes išsiunčiame POST request'ą į /auth/register API
// BACKEND: gaus duomenis, patikrins ar toks email jau egzistuoja, užkoduos vartotojo slaptažodį,
// prieš sukurdamas naują vartotoją duomenų bazėje.
// PADES: NPM paketas bcrypt - jis užkoduoja slaptažodį prieš išsaugant į duomenų bazę.

// 2. Sugeneruos JWT tokeną ir atiduosim jį vartotojui.
// FRONTEND: gaus tokeną ir jį išsaugos naršyklės localStorage.
// BACKEND: tokenas bus sugeneruotas naudojant jsonwebtoken ir vartotojo ID.

// Login

// 1. Sukuriame login API endpointą, kuris priims email ir pasword.
// FRONTEND: vartotojas suveda email ir password ir spaudžia prisijungti mygtuka.
// BACKEND: gaus duomenis, patikrins ar suvestas email ir slaptažodis,
// tada patkrins duomenu bazeje ar toks naudotojas egzistuoja.
// jeigu egzistuoja, patikrinsim suvesta slaptažodį su bcrypt.compare() funkcija,
// jeigu slaptažodžiai sutampa, atiduodame acsses tokeną.
