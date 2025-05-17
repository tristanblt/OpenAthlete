
![OpenAthlete showcase](/doc/imgs/openathlete-showcase.png)

# OpenAthlete

**OpenAthlete** is an **open-source training platform** for athletes.  
Built by the community, for the community.

🚴‍♀️ Run, ride, swim — track your workouts, generate smart training plans, and optimize your performance.  
Self-host it. Extend it. Contribute to it. Or just use it to become your strongest self.

🌐 https://openathlete.org


## ✨ Features

✅ Integrations (only Strava for the moment)  
✅ Workout tracking and progress visualization  
✅ Fully self-hostable 
✅ Respectful of your data and privacy

> 🧠 *Everything we build is open and transparent — and you’re invited to help shape it.*

---

## 🧭 Roadmap

OpenAthlete is just getting started. Here’s what’s coming next:  

- 🧩 Modular training logic (custom goals, coach import)
- 📈 Intuitive dashboards & data visualizations
- 🔗 More integrations (Garmin, Suunto, Wahoo…)
- 📅 Weekly training view

👉 See the [full roadmap here](https://github.com/tristanblt/openathlete/projects)

---

## 🚀 Get Started

1. Clone the repo  
2. Install dependencies  
3. Run your own OpenAthlete instance


```bash
git clone https://github.com/openathlete/openathlete.git
cd openathlete
pnpm install

# copy the app example env file
cp apps/web/.env.example apps/web/.env

# copy the api example env file and update it
cp apps/api/.env.example apps/api/.env

# build shared packages
pnpm shared build

# migrate the database
pnpm database run db:deploy

# run front & back in development mode
pnpm dev
```
---

## 🤝 Contribute

OpenAthlete is a community project — your contributions make it better.

- Browse issues labeled `good first issue` or `help wanted`  
- Join ongoing conversations in GitHub Discussions  
- Submit features, bug fixes, or improvements  
- Share feedback, UX ideas, or real-world use cases  
- Add training content, sport-specific tips, or new logic modules  

Read the full [Contribution Guide](CONTRIBUTING.md).

---

## 🛠️ Tech Stack

- TypeScript / React / Nest.js
- Frontend built with Tailwind CSS and ShadCN
- Backend built with Nest.js and Prisma ORM
- Database: PostgreSQL

---

## 🧪 Shaping OpenAthlete Together

We’re looking for:

- Developers (frontend, backend, or fullstack)  
- Designers (UI/UX for dashboards and mobile views)  
- Coaches and athletes to share insights and test features  
- Open source enthusiasts ready to make an impact  

Let’s build the future of training — together.

---

## 📄 License

OpenAthlete is licensed under the **MPL-2.0** — open, flexible, and designed to empower self-hosting and collaboration.  
See the [LICENSE](LICENSE) file for details.

---

## 🌟 Show Your Support

If you believe in the mission:

- Star this repo  
- Share it with athletes and developers  
- Give feedback and suggest features  
- Contribute your expertise  
