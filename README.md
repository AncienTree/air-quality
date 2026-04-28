# Air Quality Monitoring App
Aplikacja full-stack do monitorowania jakości powietrza w miastach.  
Projekt składa się z Backend (Spring Boot) oraz Frontend (React), umożliwiając przeglądanie statystyk, analizę danych w czasie oraz zarządzanie notatkami przypisanymi do miast.

## Funkcjonalności
- przegląd statystyk jakości powietrza dla miast (średnia / min / max)
- filtrowanie danych po zakresie czasu (1h, 24h, 3m)
- wyszukiwanie po mieście lub kraju
- szczegółowy widok pomiarów dla wybranego miasta
- dodawanie, edycja i usuwanie notatek dla miast
- generator danych symulujący pomiary jakości powietrza

## Architektura
Generator → Backend (Spring Boot) → PostgreSQL → REST API → Frontend (React)

## Technologie
### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Flyway

### Frontend
- React (Vite, TypeScript)
- TanStack Query
- TanStack Table
- Mantine UI
- Zustand
- Axios

### Testy
- JUnit, Mockito (backend)
- Vitest, Testing Library (frontend)

## API
### Statystyki miast
GET /api/cities/stats/{range}?search=
- `range`: H1, H24, 3M
- `search`: opcjonalny (nazwa miasta lub kraju)

### Pomiary dla miasta
GET /api/measurements/{cityId}?range=H24
Zwraca dane pomiarowe w czasie (time-series).

### Notatki
GET    /api/notes/{cityId}  
POST   /api/notes/{cityId}  
PUT    /api/notes/{noteId}  
DELETE /api/notes/{noteId}

## Generator danych
Aplikacja zawiera generator symulujący dane jakości powietrza.
- generuje wartości PM10, CO, NO2
- przypisuje dane do miast w sposób deterministyczny
- tworzy dane w czasie (timestamp w formacie epoch)
- Generator znajduje się w katalogu: `scripts/`

### Uruchomienie generatora
1. Zainstaluj zależność:
```bash
pip install requests
```
2. Uruchom generator (przykładowo):
```bash
python scripts/generator.py
```
### Parametry
Generator obsługuje następujące argumenty:
```
--count liczba generowanych rekordów (domyślnie: 10)
--range zakres czasu danych: 1h | 24h | 3m (domyślnie: 1h)
```
Przykład:
```bash
python scripts/generator.py --count 50 --range 24h
```
Generator będzie wysyłał dane do backendu (upewnij się, że backend działa).

## Baza danych (Docker)
W projekcie znajduje się przykładowa konfiguracja PostgreSQL w pliku `docker-compose.yml`.

Możesz szybko uruchomić bazę danych poleceniem:
```bash
docker-compose up -d
```
Konfiguracja:
- port: 5432
- baza: airquality
- użytkownik: postgres
- hasło: postgres

## Uruchomienie aplikacji
### Backend

```bash
cd api  
./mvnw spring-boot:run  
```

API dostępne pod:  
http://localhost:8080/api

### Frontend
```bash
cd web  
npm install  
npm run dev  
```

Aplikacja dostępna pod:  
http://localhost:5173

## Testy

### Backend
```bash
cd api  
./mvnw test  
```

### Frontend
```bash
cd web  
npm run test  
```

## Uwagi
- Skonfiguruj połączenie z bazą danych w `api/src/main/resources/application.yaml`
- Dokumentacja API dostępna pod:
  - /swagger-ui.html  
  - /swagger-ui/index.html  

## Autor
Mateusz Dąbek
Projekt przygotowany w celach rekrutacyjnych.