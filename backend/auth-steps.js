// JWT Autentifikacija

// JWT (JSON Web Token) - tai tiesiog tekstinis raktas (tokenas), kurį serveris sugeneruoja ir atiduoda vartotojui.
// Tas tokenas saugo informaciją (dažniausiai vartotojo ID) ir yra pasirašomas serverio slaptažodžiu, kurį laikome .env faile.

// Eiga:

// 1. Vartotojas suveda email ir slaptažodį ir spaudžia Registruotis mygtuką.
// FRONTEND: mes išsiunčiame POST request'ą į /auth/register API
// BACKEND: gaus duomenis, patikrins ar toks email jau egzistuoja, užkoduos vartotojo slaptažodį, prieš sukurdamas naują vartotoją duomenų bazėje.
// PADES: NPM paketas bcrypt - jis užkoduoja slaptažodį prieš išsaugant į duomenų bazę.
