# Serve Together 🌍

Serve Together is a community-driven event management platform that connects people through social development activities, volunteering, and community events.

Users can explore upcoming events, join volunteering activities, create their own events, and manage their participation.

## 🚀 Live Website

Add your deployed frontend URL here.

## ✨ Key Features

- **Responsive Design:** Fully responsive interface for mobile, tablet, and desktop devices.
- **User Authentication:** Secure registration and login using email and password.
- **Social Login:** Google or GitHub authentication.
- **Upcoming Events:** Browse and explore upcoming community events.
- **Event Details:** View detailed information about individual events.
- **Create Events:** Authenticated users can create new events.
- **Join Events:** Users can participate in available volunteering events.
- **Manage Events:** Event organizers can update and delete their own events.
- **Joined Events:** Users can view the events they have joined.
- **Protected Routes:** Private pages are accessible only to authenticated users.
- **JWT Authentication:** Secure communication between frontend and backend.
- **Dark & Light Mode:** Switch between light and dark themes.
- **Form Validation:** Validate user input before submitting forms.
- **Loading States:** Loading skeletons for a better user experience.

## 🛠️ Technologies Used

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- HeroUI / DaisyUI / Shadcn UI (as used in the project)
- Better Auth
- JWT Authentication
- Node.js & Express.js (Backend API)
- MongoDB

## 📂 Project Structure

```text
serve-together/
├── app/
│   ├── events/
│   ├── login/
│   ├── register/
│   ├── create-event/
│   ├── manage-events/
│   ├── joined-events/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   └── events/
├── lib/
├── public/
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ivyakterlotamoni/Assighnment-8-ServeTogether.git
```

### 2. Navigate to the Project Folder

```bash
cd Assighnment-8-ServeTogether
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and configure the required environment variables according to your authentication and API configuration.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

Add Google or GitHub OAuth credentials if social login is configured.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔗 Backend Repository

The backend is built with Node.js, Express.js, and MongoDB.

Backend Repository:
https://github.com/ivyakterlotamoni/Backend

## 📡 API Integration

The frontend communicates with the backend API to:

- Fetch all events.
- Fetch individual event details.
- Create new events.
- Update existing events.
- Delete events.
- Join volunteering events.
- Retrieve user-related event information.

## 🔐 Authentication & Security

- Better Auth for user authentication.
- JWT for secure API communication.
- Protected routes for authenticated users.
- Authorization checks for event management.

## 👩‍💻 Developer

**Ivy Akter Lotamoni**

Frontend Development | Next.js | TypeScript

---

⭐ Thank you for visiting Serve Together!