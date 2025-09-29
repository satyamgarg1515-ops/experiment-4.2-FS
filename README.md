# REST API for Managing Playing Cards

A simple RESTful API built with **Express.js** to manage a collection of playing cards.  
Supports listing, adding, retrieving, and deleting cards using **in-memory storage**.  
Demonstrates routing, HTTP methods, validation, and error handling in Node.js.

---

## 📌 Project Setup

### 1. Install Node.js
- Download Node.js LTS from [nodejs.org](https://nodejs.org/) and install.
- Verify installation:

```bash
node -v
npm -v
```

---

### 2. Create Project Folder
```bash
mkdir playing-card-api
cd playing-card-api
npm init -y
```

---

### 3. Install Dependencies
```bash
npm install express
```

---

### 4. Add Server Code
- Create `server.js` and paste your Express.js code.
- Ensure this middleware is **above all routes**:

```js
app.use(express.json());
```

---

### 5. Run the Server
```bash
node server.js
```

You should see:

```
Playing Card Collection API is running on http://localhost:3000
Available endpoints:
  GET    /              - API information
  GET    /cards         - List all cards
  GET    /cards/:id     - Get a specific card
  POST   /cards         - Add a new card
  DELETE /cards/:id     - Delete a card
```

---

## 🛠️ API Endpoints

### 1️⃣ GET All Cards
- **Endpoint:** `GET http://localhost:3000/cards`
- **Request Parameters:** None
- **Response Code:** 200 OK
- **Response Body:**  

![GET all cards](/output/output_2.png)

---

### 2️⃣ GET Card by ID
- **Endpoint:** `GET http://localhost:3000/cards/:id`
- **Request Parameters:** `id` of the card
- **Response Code:** 200 OK
- **Response Body:**  

![GET card by ID](/output/output_1.png)

---

### 3️⃣ POST Add a New Card
- **Endpoint:** `POST http://localhost:3000/cards`
- **Request Body (JSON):**

```json
{
  "suit": "Clubs",
  "value": "King"
}
```

- **Response Code:** 201 Created
- **Response Body:**  

![POST add card](/output/output_3.png)

---

### 4️⃣ DELETE Card by ID
- **Endpoint:** `DELETE http://localhost:3000/cards/:id`
- **Response Code:** 200 OK
- **Response Body:**  

![DELETE card](/output/output_4.png)

---

## ⚡ Notes
- Browsers only work for **GET requests**.  
- Use **Postman** or **Thunder Client** for POST and DELETE requests.  
- Cards reset to default 4 cards every time the server restarts.  
- Valid Suits: `Hearts`, `Diamonds`, `Clubs`, `Spades`  
- Valid Values: `Ace`, `2`, `3`, ..., `10`, `Jack`, `Queen`, `King`  
- Duplicate cards are not allowed.

---

## 📌 Quick Testing Tips
- Open `http://localhost:3000/` → Welcome message.  
- Open `http://localhost:3000/cards` → List all cards.  
- POST new card using JSON in Postman → Response shows new card.  
- DELETE card by ID using Postman → Response confirms deletion.  

---

