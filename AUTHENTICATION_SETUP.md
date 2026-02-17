# 🔐 RETRA - Konfiguracja Autoryzacji

## ✅ Zaimplementowane Funkcje

### Backend (API Routes)

- ✅ `/api/auth/register` - Rejestracja email/hasło
- ✅ `/api/auth/login` - Logowanie email/hasło
- ✅ `/api/auth/google` - Autoryzacja Google
- ✅ `/api/auth/apple` - Autoryzacja Apple

### Frontend

- ✅ Ekran logowania/rejestracji w `app/(tabs)/index.tsx`
- ✅ Formularz email/hasło
- ✅ Przyciski Google Sign-In i Apple Sign-In
- ✅ Bezpieczne przechowywanie tokenów (AsyncStorage)
- ✅ Automatyczne przekierowanie po zalogowaniu

### Baza Danych

- ✅ Model User w Prisma
- ✅ Połączenie z bazą PostgreSQL
- ✅ Hashowanie haseł (bcrypt)
- ✅ JWT tokeny

---

## 📝 Co Dodać do Pliku `.env`

Plik `.env` został już zaktualizowany z podstawową konfiguracją. Oto co musisz wypełnić:

```env
# ✅ DATABASE_URL - już skonfigurowane
DATABASE_URL="postgres://93e22822218eea1f595bf5f6080bc927713b988fe203bbe1afec24f4a57f4de4:sk_XFzDMqp7LYzv-StS5jt8F@db.prisma.io:5432/postgres?sslmode=require"

# ⚠️ WYMAGANE: Wygeneruj bezpieczny secret dla JWT
JWT_SECRET="replace-with-a-secure-random-string"
# Przykład: użyj node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ⚠️ WYMAGANE DLA GOOGLE AUTH: Uzyskaj z Google Cloud Console
EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID=""
EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS=""
EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB=""

# ⚠️ WYMAGANE DLA APPLE AUTH (tylko iOS): Uzyskaj z Apple Developer
EXPO_PUBLIC_APPLE_SERVICE_ID=""
```

---

## 🔑 Jak Uzyskać Klucze API

### 1. JWT_SECRET

Wygeneruj bezpieczny losowy string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Google OAuth (Android & iOS)

#### Krok 1: Google Cloud Console

1. Przejdź na https://console.cloud.google.com/
2. Stwórz nowy projekt lub wybierz istniejący
3. Włącz "Google+ API"
4. Przejdź do "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"

#### Krok 2: Android Client ID

1. Wybierz "Android"
2. Package name: `com.anonymous.retra` (z app.json)
3. SHA-1: Uzyskaj certyfikat:
   ```bash
   cd android
   ./gradlew signingReport
   ```
   Lub dla debug:
   ```bash
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
4. Skopiuj Client ID do `EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID`

#### Krok 3: iOS Client ID

1. Wybierz "iOS"
2. Bundle ID: Znajdź w `ios/retra.xcodeproj` lub użyj `com.anonymous.retra`
3. Skopiuj Client ID do `EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS`

#### Krok 4: Web Client ID

1. Wybierz "Web application"
2. Dodaj authorized redirect URIs:
   - `http://localhost:8081`
   - `https://auth.expo.io/@your-username/retra`
3. Skopiuj Client ID do `EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB`

### 3. Apple Sign In (tylko iOS)

#### Krok 1: Apple Developer Account

1. Przejdź na https://developer.apple.com/
2. Certificates, Identifiers & Profiles
3. Identifiers → App IDs
4. Stwórz lub wybierz App ID
5. Włącz "Sign In with Apple"

#### Krok 2: Service ID

1. Identifiers → Services IDs
2. Stwórz nowy Service ID
3. Włącz "Sign In with Apple"
4. Configure: Dodaj domains i return URLs
5. Skopiuj Service ID do `EXPO_PUBLIC_APPLE_SERVICE_ID`

#### Krok 3: Aktualizuj app.json (opcjonalne)

W `app.json` dodaj w sekcji `ios`:

```json
"ios": {
  "supportsTablet": true,
  "usesAppleSignIn": true,
  "bundleIdentifier": "com.anonymous.retra"
}
```

---

## 🚀 Następne Kroki

1. **Wypełnij zmienne środowiskowe** w `.env`
2. **Zainstaluj dependencies** (już zrobione):
   ```bash
   npm install
   ```
3. **Uruchom aplikację**:
   ```bash
   npm start
   ```
4. **Dla iOS** (Apple Sign In):
   ```bash
   npm run ios
   ```
5. **Dla Android** (Google Sign In):
   ```bash
   npm run android
   ```

---

## 🔒 Bezpieczeństwo

### Zaimplementowane:

- ✅ Hashowanie haseł (bcrypt, 10 rund)
- ✅ JWT tokeny z expiracją (7 dni)
- ✅ Bezpieczne przechowywanie tokenów
- ✅ Walidacja danych wejściowych
- ✅ SSL/TLS dla połączenia z bazą danych

### Rekomendacje Produkcyjne:

- 🔴 **KRYTYCZNE**: Zmień `JWT_SECRET` na silny, losowy string
- 🔴 **KRYTYCZNE**: Nie commituj pliku `.env` do git (dodany do .gitignore)
- 🟡 Zweryfikuj tokeny Google/Apple po stronie serwera (obecnie zaufanie klientowi)
- 🟡 Dodaj rate limiting dla endpointów auth
- 🟡 Dodaj refresh tokeny dla długotrwałych sesji
- 🟡 Włącz HTTPS w produkcji
- 🟡 Zaimplementuj 2FA dla bezpieczeństwa

---

## 📁 Struktura Plików

```
retra/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx          # ✅ Frontend logowania/rejestracji
│   └── api/
│       └── auth/
│           ├── register+api.ts # ✅ Backend rejestracji
│           ├── login+api.ts    # ✅ Backend logowania
│           ├── google+api.ts   # ✅ Backend Google Auth
│           └── apple+api.ts    # ✅ Backend Apple Auth
├── lib/
│   ├── prisma.ts              # ✅ Prisma client
│   ├── auth.ts                # ✅ Auth helpers
│   └── socialAuth.ts          # ✅ Social auth services
├── prisma/
│   └── schema.prisma          # ✅ Database schema
└── .env                       # ⚠️ Wypełnij zmienne!
```

---

## ❓ Testowanie

### Test Rejestracji Email:

1. Uruchom app
2. Kliknij "Start your journey"
3. Kliknij "Sign Up"
4. Wypełnij dane i kliknij "Create Account"

### Test Logowania Email:

1. Kliknij "Already have an account? Sign In"
2. Wprowadź dane i kliknij "Sign In"

### Test Google Sign In:

1. Kliknij przycisk "🔍 Google"
2. Zaloguj się kontem Google
3. Zatwierdź uprawnienia

### Test Apple Sign In (tylko iOS):

1. Kliknij przycisk " Apple"
2. Zaloguj się Apple ID
3. Zatwierdź uprawnienia

---

## 🐛 Troubleshooting

### "Authentication failed"

- Sprawdź czy wszystkie zmienne w `.env` są poprawne
- Sprawdź logi w konsoli

### "Google sign in failed"

- Upewnij się, że Client IDs są poprawne
- Sprawdź czy Google+ API jest włączone
- Sprawdź SHA-1 certyfikat dla Android

### "Apple sign in failed"

- Działa tylko na iOS (nie w symulatorze czasami)
- Upewnij się, że masz aktywne Apple Developer Account
- Sprawdź czy Service ID jest poprawnie skonfigurowany

### Database connection errors

- Sprawdź `DATABASE_URL` w `.env`
- Upewnij się, że baza danych jest dostępna
- Uruchom `npx prisma db push` aby zsynchronizować schemat

---

## 📞 Pomoc

Jeśli masz pytania lub problemy:

1. Sprawdź logi w terminalu (`npm start`)
2. Sprawdź konsole w przeglądarce deweloperskiej
3. Sprawdź dokumentację:
   - [Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
   - [Expo Apple Authentication](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)
   - [Prisma](https://www.prisma.io/docs/)
