# Pluma

![Image](https://github.com/EdgarModesto23/pluma-client/blob/main/Plumadashboard.png)

## Description
Pluma is a reactive and collaborative note-taking web application that aims to simplify the process of taking notes with your friends and colleagues!.

## ⚙ Installation
> Pluma is a fullstack web application, so you are expected to install the specific API in conjunction of this client. You can check the API [repository here.](https://github.com/EdgarModesto23/Pluma-backend)

```bash
git clone https://github.com/EdgarModesto23/pluma-client.git

cd pluma-client
npm install
```
Once installed, you'll need to create a .env file in the root of the directory and define a variable called "VITE_API_URL" with the address your Django server. (Which by default is localhost:8000).

You can then proceed to install the API locally to finish setting up our development server.

```bash
git clone https://github.com/EdgarModesto23/pluma-api.git

cd Pluma-backend
python -m venv .venv
source ./.venv/bin/activate
python -m pip freeze requirements.txt

python manage.py runserver
```

## 💬 Contact
+ [Linkedin](https://www.linkedin.com/in/edgarmodesto23)

Submit an issue (above in the issues tab)


